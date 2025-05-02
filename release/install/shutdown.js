const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();
const reset = (process.argv[2] === "--reset") ? true : false;

// create the top level folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { load: { repo: "install", dir: "packages", file: "dirs_toplevel.json" } },
            request: { }
        }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/load");
console.log(JSON.stringify(input,null,2));
input.headers.spl.package.remove = { repo: "", dir: "", file: "dirs_toplevel.json" };
input = spl.moduleAction(input, "spl/package/remove");
console.log(JSON.stringify(input,null,2));

