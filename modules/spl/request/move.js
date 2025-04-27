//  name        Move one or more files on the filesystem
//  URI         spl/request/move
//  type        API Method
//  description A wrapper around spl/blob/move.
//              Data layer access is indirect, an action notifies the execution layer
//              of the type of data operation is requires.
//              The Request API provides wrapper to register data operations.
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_request_move ( input ) {
    
    input.headers.spl.blob.move = input.headers.spl.request.blob.move;
    input.headers.spl.request.blob_next = "spl/blob/move";
    input.headers.spl.request.status = "blob";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
