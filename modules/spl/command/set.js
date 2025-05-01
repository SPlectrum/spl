//  name        Sets the command
//  URI         spl/command/set
//  type        API Method
//  description Loads the command template with client settings
//              and sets the command.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_set ( input ) {
    
    if( input.value["spl/command"] === undefined ) {
        input.headers.spl.blob.get = [ { repo: input.headers.spl.command.set.cwd, dir: "commands", file: "command.json", reference: [ "spl/command" ] } ];
        input.headers.spl.request.blob_next = "spl/blob/get";
        input.headers.spl.request.status = "blob";
        input.headers.spl.request.repeat = true;
        return input;
    } else {
        input.value["spl/command"] = JSON.parse(input.value["spl/command"]);
        input.value["spl/command"].headers.spl.command.repo = input.headers.spl.command.set.cwd;
        input.value["spl/command"].headers.spl.command.parser.repo = input.headers.spl.command.set.cwd;
        input.value["spl/command"].value.commandString = input.headers.spl.command.set.commandString;
        input.value["spl/command"].value.UUID = input.headers.spl.command.set.UUID;
    }

    delete input.headers.spl.command.set;
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
