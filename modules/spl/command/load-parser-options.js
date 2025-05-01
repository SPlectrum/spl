//  name        Loads the parser options file
//  URI         spl/command/load-parser-options
//  type        API Method
//  description Loads the parser options file
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_set ( input ) {
    
    const parserOptionsURI = spl.fURI("spl/command", input.value["spl/command"].headers.spl.command.parser.file);
    if ( input.value[ parserOptionsURI ] === undefined ) {
        input.headers.spl.blob.get = [ input.value["spl/command"].headers.spl.command.parser ];
        input.headers.spl.blob.get[0].reference = [ spl.fURI("spl/command", input.value["spl/command"].headers.spl.command.parser.file) ];
        input.headers.spl.request.blob_next = "spl/blob/get";
        input.headers.spl.request.status = "blob";
        input.headers.spl.request.repeat = true;
        return input;
    }
    input.value[parserOptionsURI] = JSON.parse(input.value[parserOptionsURI]);
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
