//  name        Sets the command
//  URI         spl/command/help
//  type        API Method
//  description Generates commandline help.
//              Uses the parser.json file to store details.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_help ( input ) {
    
    console.dir( input.headers.spl.command.help, { depth: 10 } )

    delete input.headers.spl.command.help;
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
