const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();
console.log(cwd);

// this request is not execution-wrapped as it is submitted directly onto the action
var input = {
    headers: { spl: { execute: { cwd: cwd, modules: "./install/modules" } } },
    value: { session: "client", cwd: cwd }
}
input = spl.moduleAction(input, "spl/data/execution-watcher");
console.log(JSON.stringify(input,null,2));
