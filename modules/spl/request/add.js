// spl/request/add
// read from a folder - can be specific file

function spl_request_add ( input ) {

    input.headers.spl.data = input.headers.spl.request.data;
    input.headers.spl.data_next = "spl/data/add";
    input.headers.spl.request.status = "data";
    return input;
}
exports.default = spl_request_add;