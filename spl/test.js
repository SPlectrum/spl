// it expects the type of session - boot, system or client
var session = ( process.argv[2] == undefined ) ? "boot" : process.argv[2];
const cwd = process.cwd();

var testExecute =
{
    headers: 
    { 
        spl: 
        { 
            execute: { action: "spl/execute/initialise", status: "new", session: session, cwd: cwd },
            request: { action: "spl/request/add-folders", status: "pending", data: { repo: "", folder: "" } }
        }
    },
    value: 
    { 
        backup: {},
        data: { clients: {  } },
        metadata: {},
        modules: {},
        runtime: {},
        tools: {},
        _files: []
    }
}

var spl_execute_queue = require(`${cwd}/packages/spl/data/queue`).default(testExecute);

console.log(JSON.stringify(testExecute,null,2));
