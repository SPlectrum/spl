// spl/request/read
// read from a folder - can be specific file

exports.default = function spl_request_read ( input ) {

    const spl = input.headers.spl;
    spl.data.read = spl.request.data.read;

    spl.request.data_next = "spl/data/read";
    spl.request.status = "data";
    return input;
}
