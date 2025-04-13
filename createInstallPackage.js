const spl = require("./modules/spl/spl.js");

// it expects the type of session - boot, system or client
var session = ( process.argv[2] == undefined ) ? "boot" : process.argv[2];
const cwd = process.cwd();

var input = {
    headers:  { 
        spl: { 
            execute: { session: session, cwd: cwd, modules: "modules"  },
            request: { action: "spl/package/create" },
            package: { root: "modules", folder: "spl" }
        }
    }
}
var input = spl.moduleAction(input, "spl/package/create");

input.headers.spl.package = { root: "spl/install", folder: "modules"};
input = spl.moduleAction(input, "spl/package/deploy");
console.log("Package ${spl} created.");
