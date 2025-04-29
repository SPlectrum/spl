const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();

// for initial release the full spl package is mounted in the install directory
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "modules"  },
            package: { root: "release", dir: "", name: "release_files.json" },
            request: { }
        },
        package: { name: "release_files.json", type: "framework" }
    },
    value: { }
}
var input = spl.moduleAction(input, "spl/package/create");
input.headers.spl.package = { root: "spl", dir: "", name: "release_files.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input, null, 2));

// for initial release the full spl package is mounted in the install directory
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "modules"  },
            package: { root: "modules", dir: "spl", name: "modules_spl.json" },
            request: { }
        },
        package: { name: "modules_spl.json", type: "modules" }
    },
    value: { }
}
var input = spl.moduleAction(input, "spl/package/create");
input.headers.spl.package = { root: "spl/install", dir: "modules", name: "modules_spl.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input, null, 2));
console.log("Package ${spl} created.");
