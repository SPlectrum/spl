//  name        Execute Command
//  URI         spl/command/execute API Method
//  type        API Method
//  description This is the entry point for commandline command execution.
//              It sets the execution pipeline.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_execute (input) { 

    spl.wsSet(input, "spl/execute/set-pipeline", {
        headers: {}, 
        value: [ 
            { action: "spl/command/set", "spl/command/set": input.headers.spl.command.execute.set },
            { action: "spl/command/write", "spl/command/write": { destination: "requests" } }, 
            { action: "spl/command/load-parser-options" },
            { action: "spl/command/parse" },
            { action: "spl/command/write", "spl/command/write": { destination: "responses" } },
        ]
    });
    delete input.headers.spl.command.execute;
    input.headers.spl.request.execute_next = "spl/execute/set-pipeline";
    input.headers.spl.request.status = "execute";
}
///////////////////////////////////////////////////////////////////////////////
