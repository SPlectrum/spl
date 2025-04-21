const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();
const reset = (process.argv[2] === "--reset") ? true : false;

// create the top level folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { root: "install", folder: "packages", name: "folders_toplevel.json" },
            request: { }
        },
        package: { name: "folders_toplevel.json", type: "framework" }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/load");
console.log(JSON.stringify(input,null,2));
if(reset) {
    input.headers.spl.package = { root: "", folder: "", name: "folders_toplevel.json" };
    input = spl.moduleAction(input, "spl/package/remove");
    console.log(JSON.stringify(input,null,2));
}
input.headers.spl.package = { root: "", folder: "", name: "folders_toplevel.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// create the session folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { root: "install", folder: "packages", name: "folders_session.json" },
            request: { }
        },
        package: { name: "folders_toplevel.json", type: "framework" }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/load");
input.headers.spl.package = { root: "", folder: "runtime/sessions/client", name: "folders_session.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// create the client folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { root: "install", folder: "packages", name: "folders_client.json" },
            request: { }
        },
        package: { name: "folders_client.json", type: "framework" }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/load");
input.headers.spl.package = { root: "data", folder: "clients", name: "folders_client.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// install spl module package
input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { root: "install/modules", folder: "spl", name: "modules_spl.json" },
            request: { }
        },
        package: { name: "modules_spl.json", type: "modules" }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/create");
input.headers.spl.package = { root: "", folder: "modules", name: "modules_spl.json"};
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));
console.log("Package ${spl} created.");
