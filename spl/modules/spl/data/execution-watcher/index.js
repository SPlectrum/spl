// spl/data/execution-watcher
// directory watcher for requests / records

function spl_data_execution_watcher ( input ) {

    const fs = require('fs'); 
    const cwd = input.value.cwd;
    const sess = input.value.session;
    const session = (sess !== "boot" && sess !== "system") ? `sessions/${sess}` : sess;
    const requests = `${cwd}/runtime/${session}/requests`;

    // pick up changes to the directory
    fs.watch(`${requests}/queue`, (eventType, filename) => { 

        // it must be a json file
        if(filename.substring(filename.lastIndexOf(".")+1) == "json") {

            // check that file exists
            fs.access(`${requests}/queue/${filename}`, fs.constants.F_OK | fs.constants.W_OK, (err) => {
                if (err);
                else {

                    console.log("\nThe file", filename, "was added to the queue!"); 
                    fs.readFile(`${requests}/queue/${filename}`, 'utf8', function (err, input) {

                        if(err) console.log(err);
                        else {
                            console.log(input);
                            var request = JSON.parse(input);
                            var action = request.headers.spl.execute.action;
//                            try {
                                var output = require(`${cwd}/modules/${action}`).default(request);
//                            } catch(e) {
//                                request.headers.spl.error = e;
//                                output = request;
//                            }
                            var outputString = JSON.stringify(output,null,2);
                            console.log(outputString);

                            // move request input to processed folder
                            fs.writeFile(`${requests}/processed/${filename}`, input, (err) => { 
                                if (err) console.log(err); 
                                else {
                                    console.log(`writing to processed ${requests}/processed/${filename}`);
                                    fs.unlink(`${requests}/queue/${filename}`,(err) => { 
                                        if (err) console.log(err); 
                                        else console.log(`deleting ${requests}/queue/${filename}`); })
                                }
                            });

                            // save copy of output in spl/execution folder
                            fs.writeFile(`${requests}/${action}/${filename}`, outputString, (err) => {
                                if (err) console.log(err); 
                                else console.log(`writing to execute ${requests}/${action}/${filename}`);
                            });
                            console.log("Action just executed: " + action);
                            if(action!="spl/execute/complete" && output.headers.spl.error === undefined) {
                                require(`${cwd}/modules/spl/data/queue`).default(output);
                            }
                        }
                   });
                }
            });

        }
    }); 
    return input;
}

exports.default = spl_data_execution_watcher;

/*
'use strict';

var spawn = require('child_process').spawn;

console.log("Node says hello. Let's see what ping has to say...");

var child = spawn(
  'ping'
, [ '-c', '3', 'google.com' ]
, { detached: true, stdio: 'inherit' }
);

child.unref();
*/