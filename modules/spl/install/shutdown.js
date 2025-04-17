const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();
const reset = (process.argv[2] === "--reset") ? true : false;

// create the top level folder structure
var input = {
    headers: { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules" }, 
            data: { repo: "install", folder: "packages", file: "folders_toplevel.json" }, 
            request: {} 
        }
    },
    value: {}
}
input = spl.moduleAction(input, "spl/data/read");
console.log(JSON.stringify(input,null,2));
input.headers.spl.data = { repo: "", folder: "" };
input = spl.moduleAction(input, "spl/data/remove");
console.log(JSON.stringify(input,null,2));

