//  name        Puts one or more files on the filesystem
//  URI         spl/request/put
//  type        API Method
//  description A wrapper around spl/blob/put.
//              Data layer access is indirect, an action notifies the execution layer
//              of the type of data operation is requires.
//              The Request API provides wrapper to register data operations.
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_request_put ( input ) {

    input.headers.spl.blob.put = input.headers.spl.request.blob.put;
    input.headers.spl.request.blob_next = "spl/blob/put";
    input.headers.spl.request.status = "blob";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
