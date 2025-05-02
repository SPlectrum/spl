const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();

// for initial release the full spl package is mounted in the install directory
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "modules"  },
            package: { create: { repo: "release", dir: "", file: "release_files.json" } },
            request: { }
        }
    },
    value: { }
}
var input = spl.moduleAction(input, "spl/package/create");
input.headers.spl.package.deploy = { repo: "spl", dir: "", file: "release_files.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input, null, 2));

// for initial release the full spl package is mounted in the install directory
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "modules"  },
            package: { create: { repo: "modules", dir: "spl", file: "modules_spl.json" } },
            request: { }
        }
    },
    value: { }
}
var input = spl.moduleAction(input, "spl/package/create");
input.headers.spl.package.deploy = { repo: "spl/install", dir: "modules", file: "modules_spl.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input, null, 2));
console.log("Package ${spl} created.");
