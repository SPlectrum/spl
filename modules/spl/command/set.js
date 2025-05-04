//  name        Sets the command
//  URI         spl/command/set
//  type        API Method
//  description Loads the command template with client settings
//              and sets the command.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_set ( input ) {

    if(!spl.wsExists ( input, "spl/command", "spl/data/read", input.headers.spl.command.set.template, true )) return input;
    var source = input.headers.spl.command.set;
    var destination = spl.wsRef(input, "spl/command" );
    spl.rcSet( destination, "headers.spl.command.repo", source.template.repo );
    spl.rcSet( destination, "headers.spl.command.parser.repo", source.template.repo );
    spl.rcSet( destination, "value.commandString", source.commandString );
    spl.rcSet( destination, "value.UUID", source.UUID );

    delete input.headers.spl.command.set;
    input.headers.spl.request.status = "completed";
}
///////////////////////////////////////////////////////////////////////////////
