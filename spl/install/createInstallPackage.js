const spl = require("../modules/spl/spl.js");

// it expects the type of session - boot, system or client
var session = ( process.argv[2] == undefined ) ? "boot" : process.argv[2];
const cwd = process.cwd();

var testExecute = {
    headers:  { 
        spl: { 
            execute: { action: "spl/execute/initialise", status: "new", session: session, cwd: cwd },
            request: { action: "spl/package/create", status: "pending" },
            package: { root: "modules", folder: "spl" }
        }
    }
}
var output = spl.moduleAction(testExecute, "spl/package/create");

output.headers.spl.package = { root: "install", folder: "modules"};
var output = spl.moduleAction(testExecute, "spl/package/deploy");
console.log("Package ${spl} created.");
