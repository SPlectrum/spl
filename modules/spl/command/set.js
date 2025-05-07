//  name        Sets the command
//  URI         spl/command/set
//  type        API Method
//  description Loads the command template with client settings
//              and sets the command.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_set ( input ) {

    if(!spl.wsExists ( input, "spl/command", "spl/data/read", spl.args(input, "template"), true )) return;
    var source = spl.args ( input );
    var destination = spl.wsRef ( input, "spl/command" );
    spl.rcSet( destination, "headers.spl.command.repo", source.template.repo );
    spl.rcSet( destination, "headers.spl.command.parser.repo", source.template.repo );
    spl.rcSet( destination, "value.commandString", source.commandString );
    spl.rcSet( destination, "value.UUID", source.UUID );

    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
