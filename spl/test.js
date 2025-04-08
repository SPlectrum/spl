const lib = require("./modules/spl/lib");
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
            request: { action: "spl/request/add-folders", status: "pending", data: { repo: "data", folder: "test" } }
        }
    },
    value: 
    { 
        backup: {},
        data:
        {
            clients:
            {
                boot:
                {
                    requests:
                    {
                        _files: [ { file: "readMe.txt", _contents: "Client requests folder" } ]
                    },
                    responses:
                    {
                        _files: [ { file: "readMe.txt", _contents: "Client responses folder" } ]
                    }
                }
            }
        },
        metadata: {},
        modules: {},
        runtime: {},
        tools: {},
        _files: []
    }
}

var spl_execute_queue = lib.moduleAction(testExecute, "spl/data/queue");

console.log(JSON.stringify(testExecute,null,2));
