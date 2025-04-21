//  name        Reads one or more Date Records
//  URI         spl/request/read
//  type        API Method
//  description A wrapper around spl/data/read.
//              Data layer access is indirect, an action notifies the execution layer
//              of the type of data operation is requires.
//              The Request API provides wrapper to register data operations.
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_request_read ( input ) {

    input.headers.spl.data.read = input.headers.spl.request.data.read;

    input.headers.spl.request.data_next = "spl/data/read";
    input.headers.spl.request.status = "data";
    return input;
}
