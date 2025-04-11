const spl = require("../modules/spl/spl.js");
const cwd = process.cwd();
console.log(cwd);
var session = process.argv[2];

// Minimal boot creates the minimal folder structure and starts the request watcher and fixed console app watcher
// The modules folder 


// this request is not execution-wrapped as it is submitted directly onto the action
var testExecute =
{
    headers: { spl: { execute: { cwd: cwd } } },
    value: { session: session, cwd: cwd }
}
//var spl_execute_queue = spl.moduleAction(testExecute, "spl/data/execution-watcher");
console.log(JSON.stringify(testExecute,null,2));
