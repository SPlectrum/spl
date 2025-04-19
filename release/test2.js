const spl = require("../modules/spl/spl.js");
const cwd = process.cwd();

var command = {
    headers: { 
        spl: { 
            execute: { action: "spl/execute/initialise", status: "new", cwd: cwd, session: "client", modules: "../modules", TTL: 100 }, 
            data: { put: [ { repo: "runtime/sessions/client", folder: `requests/complete`, file: "17450543404380.json" } ], history: [] },
            request: { action: "spl/command/execute", status: "pending" }
        } 
    },
    value: { "spl/data": { "runtime/sessions/client/requests/complete/17450543404380_json": { headers: {}, value: { "test": "This is a test only ... " } } } }
}
console.log(JSON.stringify(command,null,2));
command = spl.moduleAction(command, "spl/data/put");
console.log(JSON.stringify(command,null,2));

/*
var command = {
    headers: { 
        spl: { 
            execute: { action: "spl/execute/initialise", status: "new", cwd: cwd, session: "client", modules: "../modules", TTL: 100 }, 
            data: { put: [ { repo: "runtime/sessions/client", folder: `requests/complete`, file: "17450543404380.json" } ], history: [] },
            request: { action: "spl/command/execute", status: "pending" }
        } 
    },
    value: { "spl/data": { "runtime/sessions/client/requests/complete/17450543404380_json": { headers: {}, value: { "test": "This is a test only ... " } } } }
}

var command = {
    headers: { 
        spl: { 
            execute: { action: "spl/execute/initialise", status: "new", cwd: cwd, session: "client", modules: "../modules", TTL: 100 }, 
            data: { write: [ { repo: "runtime/sessions/client", folder: `requests/initialise` } ], history: [] },
            request: { action: "spl/command/execute", status: "pending" }
        } 
    },
    value: { "spl/data": { "runtime/sessions/client/requests/initialise": { headers: {}, value: { "test": "This is a test only ... " } } } }
}

const dataFile = {};
                dataFile[`runtime/sessions/${session}/requests/initialise`] = structuredClone(input);
                const writeRecord = {
                    headers: { 
                        spl: { 
                            data: { write: [ { repo: `runtime/sessions/${session}`, folder: `requests/initialise` } ] },
                            execute: { cwd: input.headers.spl.execute.cwd }
                        } 
                    },
                    value: { "spl/data": dataFile }
                }
console.log(JSON.stringify(writeRecord));
                const writeOutput = spl.moduleAction( writeRecord, "spl/data/write" );*/
