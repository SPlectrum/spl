const lib = require("./modules/spl/lib");
const cwd = process.cwd();
console.log(cwd);
var session = process.argv[2];

// this request is not execution-wrapped as it is submitted directly onto the action
var testExecute =
{
    headers: { spl: { execute: { cwd: cwd } } },
    value: { session: session, cwd: cwd }
}
var spl_execute_queue = lib.moduleAction(testExecute, "spl/data/execution-watcher");
console.log(JSON.stringify(testExecute,null,2));
