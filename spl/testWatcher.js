
var session = process.argv[2];
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

var spl_execute_queue = require(`${cwd}/packages/spl/execute/watcher`).default(testExecute);

console.log(JSON.stringify(testExecute));
