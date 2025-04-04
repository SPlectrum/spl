// it expects the type of session - boot, system or client
var session = ( process.argv[2] == undefined ) ? "boot" : process.argv[2];
const cwd = process.cwd();

var testExecute = {
    "headers": { 
        "spl": { 
            "data": { "repo": "runtime/boot/data", "folder": "test", },
            "execute": {
                "action": "spl/execute/initialise", "status": "new", "session": session, "cwd": cwd 
            },
            "request": {
                "action": "spl/request/read", "status": "pending" 
            }
        }
    },
    "value": { "test": "Testing persisting data location persistence." }
}

var spl_execute_queue = require(`${cwd}/packages/spl/data/queue`).default(testExecute);

console.log(JSON.stringify(testExecute));
