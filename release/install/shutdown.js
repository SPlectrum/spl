const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();
const reset = (process.argv[2] === "--reset") ? true : false;

// create the top level folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { root: "install", folder: "packages", name: "folders_toplevel.json" },
            request: { }
        },
        package: { name: "folders_toplevel.json", type: "framework" }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/load");
console.log(JSON.stringify(input,null,2));
input.headers.spl.package = { root: "", folder: "", name: "folders_toplevel.json" };
input = spl.moduleAction(input, "spl/package/remove");
console.log(JSON.stringify(input,null,2));

