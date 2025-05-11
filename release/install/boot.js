const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();
const reset = (process.argv[2] === "--reset") ? true : false;

// create the top level folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { action: "spl/execute/next", cwd: cwd, modules: "install/modules"  },
            package: { load: { repo: "install", dir: "packages", file: "dirs_toplevel.json" } },
            request: { action: "spl/package/load" }
        }
    },
    value: { }
}
spl.moduleAction(input, "spl/package/load");
console.log(JSON.stringify(input,null,2));
if(reset) {
    spl.setConfig ( input, "spl/package/remove", null, { repo: "", dir: "", file: "dirs_toplevel.json" } );
    spl.setRequest ( input, "action", "spl/package/remove" )
    spl.moduleAction(input, "spl/package/remove");
    console.log(JSON.stringify(input,null,2));
}
spl.setConfig ( input, "spl/package/deploy", null, { repo: "", dir: "", file: "dirs_toplevel.json" } );
spl.setRequest ( input, "action", "spl/package/deploy" )
spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// create the session folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { action: "spl/execute/next", cwd: cwd, modules: "install/modules"  },
            package: { load: { repo: "install", dir: "packages", file: "dirs_session.json" } },
            request: { action: "spl/package/load" }
        }
    },
    value: { }
}
spl.moduleAction(input, "spl/package/load");
spl.setConfig ( input, "spl/package/deploy", null, { repo: "", dir: "runtime/sessions/client", file: "dirs_session.json" } );
spl.setRequest ( input, "action", "spl/package/deploy" )
spl.moduleAction(input, "spl/package/deploy");
spl.setConfig ( input, "spl/package/deploy", null, { repo: "", dir: "runtime/sessions/test", file: "dirs_session.json" } );
spl.setRequest ( input, "action", "spl/package/deploy" )
spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// create the client client folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { action: "spl/execute/next", cwd: cwd, modules: "install/modules"  },
            package: { load: { repo: "install", dir: "packages", file: "apps_client.json" } },
            request: { action: "spl/package/load" }
        }
    },
    value: { }
}
spl.moduleAction(input, "spl/package/load");
spl.setConfig ( input, "spl/package/deploy", null, { repo: "apps", dir: "", file: "apps_client.json" } );
spl.setRequest ( input, "action", "spl/package/deploy" )
spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// create the test client folder structure
var input = {
    headers:  { 
        spl: { 
            execute: { action: "spl/execute/next", cwd: cwd, modules: "install/modules"  },
            package: { load: { repo: "install", dir: "packages", file: "apps_test.json" } },
            request: { action: "spl/package/load" }
        }
    },
    value: { }
}
spl.moduleAction(input, "spl/package/load");
spl.setConfig ( input, "spl/package/deploy", null, { repo: "apps", dir: "", file: "apps_test.json" } );
spl.setRequest ( input, "action", "spl/package/deploy" )
spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));

// install spl module package
input = {
    headers:  { 
        spl: { 
            execute: { action: "spl/execute/next", cwd: cwd, modules: "install/modules"  },
            package: { create: { repo: "install/modules", dir: "spl", file: "modules_spl.json" } },
            request: { action: "spl/package/create" }
        }
    },
    value: { }
}
spl.moduleAction(input, "spl/package/create");
spl.setConfig ( input, "spl/package/deploy", null, { repo: "", dir: "modules", file: "modules_spl.json"} );
spl.setRequest ( input, "action", "spl/package/deploy" )
spl.moduleAction(input, "spl/package/deploy");
console.log(JSON.stringify(input,null,2));
console.log("Package ${spl} created.");

