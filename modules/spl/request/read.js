// spl/request/read
// read from a folder - can be specific file

exports.default = function spl_request_read ( input ) {

    input.headers.spl.data.read = input.headers.spl.request.data.read;

    input.headers.spl.request.data_next = "spl/data/read";
    input.headers.spl.request.status = "data";
    return input;
}
