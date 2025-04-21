const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();

// for initial release the full spl package is mounted in the install folder
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "modules"  },
            package: { root: "release", folder: "", name: "release_files.json" },
            request: { }
        },
        package: { name: "release_files.json", type: "framework" }
    },
    value: { }
}
var input = spl.moduleAction(input, "spl/package/create");
input.headers.spl.package = { root: "spl", folder: "", name: "release_files.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input, null, 2));

// for initial release the full spl package is mounted in the install folder
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "modules"  },
            package: { root: "modules", folder: "spl", name: "modules_spl.json" },
            request: { }
        },
        package: { name: "modules_spl.json", type: "modules" }
    },
    value: { }
}
var input = spl.moduleAction(input, "spl/package/create");
input.headers.spl.package = { root: "spl/install", folder: "modules", name: "modules_spl.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input, null, 2));
console.log("Package ${spl} created.");
