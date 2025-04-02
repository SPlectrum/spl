
var session = process.argv[2];
const cwd = process.cwd();

// this request is not execution-wrapped as it is submitted directly onto the action
var testExecute = {
    "headers": { 
        "spl": { 
            "request": {
                "action": "spl/request/execution-watcher", "status": "new", "session": session, "cwd": cwd 
            }
        }
    },
    "value": { "session": session, "cwd": cwd }
}
var spl_execute_queue = require(`${cwd}/packages/spl/request/execution-watcher`).default(testExecute);
console.log(JSON.stringify(testExecute));
