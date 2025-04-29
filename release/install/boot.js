const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();
const reset = (process.argv[2] === "--reset") ? true : false;

// create the top level dir structure
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { root: "install", dir: "packages", name: "dirs_toplevel.json" },
            request: { }
        },
        package: { name: "dirs_toplevel.json", type: "framework" }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/load");
console.log(JSON.stringify(input,null,2));
if(reset) {
    input.headers.spl.package = { root: "", dir: "", name: "dirs_toplevel.json" };
    input = spl.moduleAction(input, "spl/package/remove");
    console.log(JSON.stringify(input,null,2));
}
input.headers.spl.package = { root: "", dir: "", name: "dirs_toplevel.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// create the session dir structure
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { root: "install", dir: "packages", name: "dirs_session.json" },
            request: { }
        },
        package: { name: "dirs_toplevel.json", type: "framework" }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/load");
input.headers.spl.package = { root: "", dir: "runtime/sessions/client", name: "dirs_session.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// create the client dir structure
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { root: "install", dir: "packages", name: "dirs_client.json" },
            request: { }
        },
        package: { name: "dirs_client.json", type: "framework" }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/load");
input.headers.spl.package = { root: "data", dir: "clients", name: "dirs_client.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// install spl module package
input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { root: "install/modules", dir: "spl", name: "modules_spl.json" },
            request: { }
        },
        package: { name: "modules_spl.json", type: "modules" }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/create");
input.headers.spl.package = { root: "", dir: "modules", name: "modules_spl.json"};
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));
console.log("Package ${spl} created.");
