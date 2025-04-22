//  name        Command Auxiliary Functions
//  URI         spl/command/command
//  type        Auxiliary Library
//  description Contains the commandline parser.
///////////////////////////////////////////////////////////////////////////////
const parser = require('command-line-args');
///////////////////////////////////////////////////////////////////////////////
exports.parse = function (args, definitions) {
    if(definitions === undefined) definitions = [{ name: 'command', defaultOption: true }];
    return parser(definitions, { stopAtFirstUnknown: true, argv: args });
}
///////////////////////////////////////////////////////////////////////////////

