// spl/data/execution-watcher
// directory watcher for requests / records
const spl = require("../spl.js")
const data = require("./data.js")

// SHOULD BE PARKED AS IT IS DEPRECATED
// NEED NEW IMPLEMENTATION FOR ASYNCHRONOUS

const fs = require("fs")

exports.default = function spl_data_execution_watcher ( input ) {

    const cwd = input.value.cwd;
    const sess = input.value.session;
    const session = (sess !== "boot" && sess !== "system") ? `sessions/${sess}` : sess;
    const requests = `${cwd}/runtime/${session}/requests`;

    // PROMISES: the remaining direct fs access needs to be reworked as promises
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
//                            console.log(input);
                            var request = JSON.parse(input);
                            var action = request.headers.spl.execute.action;
                            var output = spl.executeAction(request);;
                            var outputString = JSON.stringify(output,null,2);
                            console.log(outputString);

                            // move request input to processed dir
                            data.moveFile(`${requests}/queue/${filename}`, `${requests}/processed/${filename}`);

                            // save copy of output in spl/execution dir
                            data.putFile(`${requests}/${action}/${filename}`, outputString);

                            // Update TTL
                            if(--output.headers.spl.execute.TTL < 1) spl.addErrorInfo(output, "TTL has expired, execution aborted.");

                            console.log("Action just executed: " + action);
                            if(action!="spl/execute/complete" && output.headers.spl.error === undefined) {
                                spl.moduleAction(output, "spl/data/queue");
                            }

                            if(output.headers.spl.error) console.error(output.headers.spl.error);
                        }
                   });
                }
            });

        }
    }); 
    return input;
}

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