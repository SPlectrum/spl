// spl/request/remove
// read from a folder - can be specific file

function spl_request_remove ( input ) {

    const spl = input.headers.spl;
    spl.data = spl.request.data;
    spl.data_next = "spl/data/remove";
    spl.request.status = "data";
    return input;
}
exports.default = spl_request_remove;