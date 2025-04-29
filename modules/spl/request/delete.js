//  name        Delete one or more files or dirs
//  URI         spl/request/delete
//  type        API Method
//  description A wrapper around spl/blob/delete.
//              Data layer access is indirect, an action notifies the execution layer
//              of the type of data operation is requires.
//              The Request API provides wrapper to register data operations.
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_request_delete ( input ) {
    
    input.headers.spl.blob.delete = input.headers.spl.request.blob.delete;
    input.headers.spl.request.blob_next = "spl/blob/delete";
    input.headers.spl.request.status = "blob";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
