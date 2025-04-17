const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();
const reset = (process.argv[2] === "--reset") ? true : false;

// create the top level folder structure
var input = {
    headers: { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules" }, 
            data: { repo: "install", folder: "packages", file: "folders_toplevel.json" }, 
            request: {} 
        }
    },
    value: {}
}
input = spl.moduleAction(input, "spl/data/read");
console.log(JSON.stringify(input,null,2));
if(reset) {
    input.headers.spl.data = { repo: "", folder: "" };
    input = spl.moduleAction(input, "spl/data/remove");
    console.log(JSON.stringify(input,null,2));
}

input.headers.spl.data = { repo: "", folder: "" };
input = spl.moduleAction(input, "spl/data/add");
console.log(JSON.stringify(input,null,2));

// create the session folder structure
input =
{
    headers: { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules" }, 
            data: { repo: "install", folder: "packages", file: "folders_session.json" }, 
            request: {} 
        }
    },
    value: {}
}
input = spl.moduleAction(input, "spl/data/read");
input.headers.spl.data = { repo: "", folder: "runtime/sessions/client" };
input = spl.moduleAction(input, "spl/data/add");
console.log(JSON.stringify(input,null,2));

// create the client folder structure
input =
{
    headers: { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules" }, 
            data: { repo: "install", folder: "packages", file: "folders_client.json" }, 
            request: {} 
        }
    },
    value: {}
}
input = spl.moduleAction(input, "spl/data/read");
input.headers.spl.data = { repo: "data", folder: "clients" };
input = spl.moduleAction(input, "spl/data/add");
console.log(JSON.stringify(input,null,2));

input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { root: "install/modules", folder: "spl" },
            request: { }
        }
    }
}
input = spl.moduleAction(input, "spl/package/create");
input.headers.spl.package = { root: "", folder: "modules"};
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));
console.log("Package ${spl} created.");
