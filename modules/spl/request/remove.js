// spl/request/remove
// read from a folder - can be specific file

exports.default = function spl_request_remove ( input ) {

    input.headers.spl.data = input.headers.spl.request.data;
    input.headers.spl.data_next = "spl/data/remove";
    input.headers.spl.request.status = "data";
    return input;
}
