// spl/execute/watcher
// directory watcher for requests / records

function spl_execute_watcher ( input ) {

    const fs = require('fs'); 
    const cwd = input.headers.spl.execute.cwd;
    const sess = input.headers.spl.execute.session;
    const session = (sess !== "boot" && sess !== "system") ? `sessions/${sess}` : sess;
    const requests = `${cwd}/runtime/${session}/requests`;

    // pick up changes to the directory
    fs.watch(`${requests}/queue`, (eventType, filename) => { 
 
        console.log("Watcher has triggered: ", eventType, " ", filename, " !!!"); 
        if(filename.substr(filename.lastIndexOf(".")+1) == "json") {

            console.log("\nThe file", filename, "was added to the queue!"); 
            fs.readFile(`${requests}/queue/${filename}`, 'utf8', function (err, input) {

                    if(err) console.log(err);
                    var request = JSON.parse(input);
                    console.log(request);

                    var action = request.headers.spl.execute.action;
                    var output = require(`${cwd}/packages/${action}`).default(request);
                    console.log(output);
                    output = JSON.stringify(output);
                }
            );
            fs.writeFile(`${requests}/${action}/${filename}`, output, (err) => { if (err) throw err; console.log(`writing to execute ${requests}/${action}/${filename}`); });
            fs.writeFile(`${requests}/processed/${filename}`, input, (err) => { if (err) throw err; console.log(`writing to processed ${requests}/processed/${filename}`); });

/*

            console.log("Action being executed: " + action);
            if(action!="execute/complete") {
            let x = Math.floor((Math.random() * 1000)).toString();
            var newName = `${Date.now().toString()}_${x}.json`;
            console.log("Writing next request to the queue: " + newName);

            fs.writeFileSync(`./runtime/queue/${newName}`, output);

            }

            fs.unlink(`./runtime/queue/${filename}`,(err) => { if (err) throw err; console.log(`deleting ./runtime/queue/${filename}`); })
*/

        }
    }); 


    return input;
}

exports.default = spl_execute_watcher;