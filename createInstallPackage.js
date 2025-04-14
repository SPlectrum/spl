const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();

var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "modules"  },
            package: { root: "modules", folder: "spl" },
            request: { }
        }
    }
}
var input = spl.moduleAction(input, "spl/package/create");

input.headers.spl.package = { root: "spl/install", folder: "modules"};
input = spl.moduleAction(input, "spl/package/deploy");
console.log("Package ${spl} created.");
