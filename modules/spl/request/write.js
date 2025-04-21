//  name        Write one or more Date Records
//  URI         spl/request/write
//  type        API Method
//  description A wrapper around spl/data/write.
//              Data layer access is indirect, an action notifies the execution layer
//              of the type of data operation is requires.
//              The Request API provides wrapper to register data operations.
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_request_write ( input ) {
    
    input.headers.spl.data = input.headers.spl.request.data;
    input.headers.spl.request.data_next = "spl/data/write";
    input.headers.spl.request.status = "data";
    return input;
}
