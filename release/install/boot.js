const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();
const reset = (process.argv[2] === "--reset") ? true : false;

// create the top level folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { load: { repo: "install", dir: "packages", file: "dirs_toplevel.json" } },
            request: { }
        }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/load");
console.log(JSON.stringify(input,null,2));
if(reset) {
    input.headers.spl.package.remove = { repo: "", dir: "", file: "dirs_toplevel.json" };
    input = spl.moduleAction(input, "spl/package/remove");
    console.log(JSON.stringify(input,null,2));
}
input.headers.spl.package.deploy = { repo: "", dir: "", file: "dirs_toplevel.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// create the session folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { load: { repo: "install", dir: "packages", file: "dirs_session.json" } },
            request: { }
        }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/load");
input.headers.spl.package.deploy = { repo: "", dir: "runtime/sessions/client", file: "dirs_session.json" };
input = spl.moduleAction(input, "spl/package/deploy");
input.headers.spl.package.deploy = { repo: "", dir: "runtime/sessions/test", file: "dirs_session.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// create the client client folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { load: { repo: "install", dir: "packages", file: "clients_client.json" } },
            request: { }
        }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/load");
input.headers.spl.package.deploy = { repo: "clients", dir: "", file: "clients_client.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// create the test client folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { load: { repo: "install", dir: "packages", file: "clients_test.json" } },
            request: { }
        }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/load");
input.headers.spl.package.deploy = { repo: "clients", dir: "", file: "clients_test.json" };
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// install spl module package
input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "install/modules"  },
            package: { create: { repo: "install/modules", dir: "spl", file: "modules_spl.json" } },
            request: { }
        }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/create");
input.headers.spl.package.deploy = { repo: "", dir: "modules", file: "modules_spl.json"};
input = spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));
console.log("Package ${spl} created.");
