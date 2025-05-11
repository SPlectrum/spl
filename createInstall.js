const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();

// for initial release the full spl package is mounted in the install directory
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "modules", action: "spl/execute/next"  },
            package: { create: { repo: "release", dir: "", file: "release_files.json" } },
            request: { action: "spl/package/create" }
        }
    },
    value: { }
}
spl.moduleAction(input, "spl/package/create");
spl.setRequest ( input, "action", "spl/package/deploy" )
input.headers.spl.package.deploy = { repo: "spl", dir: "", file: "release_files.json" };
spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input, null, 2));

// for initial release the full spl package is mounted in the install directory
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "modules", action: "spl/execute/next"  },
            package: { create: { repo: "modules", dir: "spl", file: "modules_spl.json" } },
            request: { action: "spl/package/create" }
        }
    },
    value: { }
}
spl.moduleAction(input, "spl/package/create");
spl.setRequest ( input, "action", "spl/package/deploy" )
input.headers.spl.package.deploy = { repo: "spl/install", dir: "modules", file: "modules_spl.json" };
spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input, null, 2));
console.log("Package ${spl} created.");
