//  name        Get one or more files
//  URI         spl/request/get
//  type        API Method
//  description A wrapper around spl/blob/get.
//              Data layer access is indirect, an action notifies the execution layer
//              of the type of data operation is requires.
//              The Request API provides wrapper to register data operations.
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_request_get ( input ) {

    input.headers.spl.blob.get = input.headers.spl.request.blob.get;
    input.headers.spl.request.blob_next = "spl/blob/get";
    input.headers.spl.request.status = "blob";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
