const spl = require("../modules/spl/spl.js");
const test = require("command-line-args")
const cwd = process.cwd();
var reset = process.argv[2];

console.log(reset);


var input = {
    headers: { 
        spl: { 
            execute: { session: "client", cwd: cwd, modules: "../modules" },
            data: { root: "../modules", folder: "spl/package" },
            request: {}
        }
    }
}
//input = spl.moduleAction(input, "spl/package/create");

//input.headers.spl.package = { root: "install", folder: "packages", file: "modules_spl_package.json" }
//input = spl.moduleAction(input, "spl/package/save");

console.log(JSON.stringify(input,null,2));
