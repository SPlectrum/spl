const spl = require("../modules/spl/spl.js");
const cwd = process.cwd();

input = {
    headers:  { 
        spl: { 
            execute: { cwd: cwd, modules: "../modules"  },
            package: { root: "clients", dir: "test", name: "clients_test.json" },
            request: { }
        }
    },
    value: { }
}
input = spl.moduleAction(input, "spl/package/create");
input.headers.spl.package = { root: "../release", dir: "install/packages", name: "clients_test.json"};
input = spl.moduleAction(input, "spl/package/save");
console.log(JSON.stringify(input,null,2));


/*var command = {
    headers: { 
        spl: { 
            execute: { action: "spl/execute/initialise", status: "new", cwd: cwd, session: "client", modules: "../modules", TTL: 100 }, 
            blob: { put: [ { repo: "data", dir: "test" }, { repo: "data", dir: "test", file: "12345.txt" } ], history: [] },
            request: { action: "spl/blob/put", status: "pending" }
        } 
    },
    value: { "spl/blob": { "data/test/12345_txt": { headers: {}, value: { "test": "This is a test only ... " } } } }
}
console.log(JSON.stringify(command,null,2));
command = spl.moduleAction(command, "spl/blob/put");
console.log(JSON.stringify(command,null,2));*/

/*var command = {
    headers: { 
        spl: { 
            execute: { action: "spl/execute/initialise", status: "new", cwd: cwd, session: "client", modules: "../modules", TTL: 100 }, 
            blob: { copy: [ { from : { repo: "data", dir: "test", file: "12345.txt" }, to : { repo: "data", dir: "test2", file: "12345.txt" } } ], history: [] },
            request: { status: "pending" }
        } 
    },
    value: { }
}
console.log(JSON.stringify(command,null,2));
command = spl.moduleAction(command, "spl/blob/copy");
console.log(JSON.stringify(command,null,2));*/

/*blob/put
var command = {
    headers: { 
        spl: { 
            execute: { action: "spl/execute/initialise", status: "new", cwd: cwd, session: "client", modules: "../modules", TTL: 100 }, 
            data: { put: [ { repo: "runtime/sessions/client", dir: `requests/complete`, file: "17450543404380.json" } ], history: [] },
            request: { action: "spl/command/execute", status: "pending" }
        } 
    },
    value: { "spl/data": { "runtime/sessions/client/requests/complete/17450543404380_json": { headers: {}, value: { "test": "This is a test only ... " } } } }
}*/

/*var command = {
    headers: { 
        spl: { 
            execute: { action: "spl/execute/initialise", status: "new", cwd: cwd, session: "client", modules: "../modules", TTL: 100 }, 
            data: { write: [ { repo: "runtime/sessions/client", dir: `requests/initialise` } ], history: [] },
            request: { action: "spl/command/execute", status: "pending" }
        } 
    },
    value: { "spl/data": { "runtime/sessions/client/requests/initialise": { headers: {}, value: { "test": "This is a test only ... " } } } }
}*/

/*const dataFile = {};
                dataFile[`runtime/sessions/${session}/requests/initialise`] = structuredClone(input);
                const writeRecord = {
                    headers: { 
                        spl: { 
                            data: { write: [ { repo: `runtime/sessions/${session}`, dir: `requests/initialise` } ] },
                            execute: { cwd: input.headers.spl.execute.cwd }
                        } 
                    },
                    value: { "spl/data": dataFile }
                }
console.log(JSON.stringify(writeRecord));
                const writeOutput = spl.moduleAction( writeRecord, "spl/data/write" );*/
