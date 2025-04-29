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

    if( input.value["spl/command"] === undefined ) {
        input.headers.spl.blob.get = [ { repo: input.headers.spl.request.command.cwd, dir: "commands", file: "command.json", reference: [ "spl/command" ] } ];
        input.headers.spl.request.blob_next = "spl/blob/get";
        input.headers.spl.request.status = "blob";
        input.headers.spl.request.repeat = true;
        return input;
    } else {
        input.value["spl/command"] = JSON.parse(input.value["spl/command"]);
        input.value["spl/command"].headers.spl.command.repo = input.headers.spl.request.command.cwd;
        input.value["spl/command"].headers.spl.command.parser.repo = input.headers.spl.request.command.cwd;
        input.value["spl/command"].value.commandString = input.headers.spl.request.command.commandString;
        input.value["spl/command"].value.UUID = input.headers.spl.request.command.UUID;
    }

    spl.wsSet(input, "spl/execute/set-pipeline", {
        headers: {}, 
        input: [ 
            { action: "spl/command/write", destination: "requests" }, 
            { action: "spl/command/parse" },
            { action: "spl/command/write", destination: "responses" },
        ]
    });
    input.headers.spl.request.execute_next = "spl/execute/set-pipeline";
    input.headers.spl.request.status = "execute";
    return input 
}
///////////////////////////////////////////////////////////////////////////////
