//  name        Execute Command
//  URI         spl/command/execute API Method
//  type        API Method
//  description This is the entry point for commandline command execution.
//              It sets the execution pipeline.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_execute (input) { 

    const session = input.headers.spl.execute.session;

    spl.wsSet(input, "spl/execute/set-pipeline", { 
        headers: {}, 
        input: [ 
            { action: "spl/command/write", destination: "requests" }, 
            { action: "spl/request/read", data: { read: [ { repo: "data", folder: `clients/${session}` } ] } }, 
            { action: "spl/command/parse", parseOptions: `data/clients/${session}` },
            { action: "spl/command/write", destination: "responses" },
        ]
    });

    input.headers.spl.request.execute_next = "spl/execute/set-pipeline";
    input.headers.spl.request.status = "execute";
    return input 
}
///////////////////////////////////////////////////////////////////////////////
