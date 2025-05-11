const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();
const reset = (process.argv[2] === "--reset") ? true : false;

// create the top level folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { action: "spl/execute/next", cwd: cwd, modules: "install/modules"  },
            package: { load: { repo: "install", dir: "packages", file: "dirs_toplevel.json" } },
            request: { action: "spl/package/load" }
        }
    },
    value: { }
}
spl.moduleAction(input, "spl/package/load");
console.log(JSON.stringify(input,null,2));
spl.setConfig ( input, "spl/package/remove", null, { repo: "", dir: "", file: "dirs_toplevel.json" } );
spl.setRequest ( input, "action", "spl/package/remove" )
spl.moduleAction(input, "spl/package/remove");
console.log(JSON.stringify(input,null,2));

