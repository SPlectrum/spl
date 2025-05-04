//  name        Loads the parser options file
//  URI         spl/command/load-parser-options
//  type        API Method
//  description Loads the parser options file
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_set ( input ) {
    const splCommand = spl.wsRef ( input, "spl/command" );    
    const parserOptionsURI = spl.fURI("spl/command", splCommand.headers.spl.command.parser.file);
    const args = [ splCommand.headers.spl.command.parser ];
    args[0].reference = [ spl.fURI("spl/command", splCommand.headers.spl.command.parser.file) ];
    if(!spl.wsExists ( input, parserOptionsURI, "spl/blob/get", args, true )) return;
    input.value[parserOptionsURI] = JSON.parse(input.value[parserOptionsURI]);
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
