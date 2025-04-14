const spl = require("../modules/spl/spl.js");

// it expects the type of session - boot, system or client
var session = ( process.argv[2] == undefined ) ? "boot" : process.argv[2];
const cwd = process.cwd();

var input = {
    headers: { 
        spl: { 
            execute: { session: session, cwd: cwd, modules: "../modules" },
            package: { root: "../modules", folder: "spl/package" },
            request: {}
        }
    }
}
input = spl.moduleAction(input, "spl/package/create");

input.headers.spl.package = { root: "install", folder: "packages", file: "modules_spl_package.json" }
input = spl.moduleAction(input, "spl/package/save");

console.log(JSON.stringify(input,null,2));
