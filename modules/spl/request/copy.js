//  name        Copies one or more files or dirs
//  URI         spl/request/copy
//  type        API Method
//  description A wrapper around spl/blob/copy.
//              Data layer access is indirect, an action notifies the execution layer
//              of the type of data operation is requires.
//              The Request API provides wrapper to register data operations.
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_request_copy ( input ) {

    input.headers.spl.blob.copy = input.headers.spl.request.blob.copy;
    input.headers.spl.request.blob_next = "spl/blob/copy";
    input.headers.spl.request.status = "blob";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
