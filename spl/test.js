// it expects the type of session - boot, system or client
var session = ( process.argv[2] == undefined ) ? "boot" : process.argv[2];
const cwd = process.cwd();

var testExecute = {
    "headers": { 
        "spl": { 
            "execute": {
                "action": "execute/initialise", "status": "new", "session": session, "cwd": cwd 
            }
        }
    },
    "value": {
        "headers": { 
            "action": "spl/noop", "status": "pending"
        },
        "value": null
    }
}

var spl_execute_queue = require(`${cwd}/packages/spl/execute/queue`).default;
testExecute = spl_execute_queue(testExecute);

console.log(JSON.stringify(testExecute));
