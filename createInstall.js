const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();

// for initial release the full spl package is mounted in the install folder
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "modules"  },
            package: { root: "", folder: "install" },
            request: { }
        }
    }
}
var input = spl.moduleAction(input, "spl/package/create");
input.headers.spl.package = { root: "", folder: "spl"};
//input = spl.moduleAction(input, "spl/package/deploy");
console.log("Package ${spl} created.");

/*
// for initial release the full spl package is mounted in the install folder
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
*/