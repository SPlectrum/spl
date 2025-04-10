// spl/request/write
// Writes a file to a folder

function spl_request_write ( input ) {
    const spl = input.headers.spl;
    spl.data = spl.request.data;
    spl.request.data_next = "spl/data/write";
    spl.request.status = "data";
    return input;
}
exports.default = spl_request_write;