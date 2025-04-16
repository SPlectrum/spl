// spl/command/command.js
// Auxiliary functions for command execution
const parser = require('command-line-args');

exports.parse = function (args, definitions) {
    if(definitions === undefined) definitions = [{ name: 'command', defaultOption: true }];
    return parser(definitions, { stopAtFirstUnknown: true, argv: args });
}