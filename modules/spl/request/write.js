// spl/request/write
// Writes a file to a folder

exports.default = function spl_request_write ( input ) {
    
    input.headers.spl.data = input.headers.spl.request.data;
    input.headers.spl.request.data_next = "spl/data/write";
    input.headers.spl.request.status = "data";
    return input;
}
