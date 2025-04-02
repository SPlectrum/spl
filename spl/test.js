// it expects the type of session - boot, system or client
var session = ( process.argv[2] == undefined ) ? "boot" : process.argv[2];
const cwd = process.cwd();

var testExecute = {
    "headers": { 
        "spl": { 
            "execute": {
                "action": "spl/execute/initialise", "status": "new", "session": session, "cwd": cwd 
            },
            "request": {
                "action": "spl/misc/noop", "status": "pending" 
            }
        }
    },
    "value": null
}

var spl_execute_queue = require(`${cwd}/packages/spl/request/queue`).default(testExecute);

console.log(JSON.stringify(testExecute));
