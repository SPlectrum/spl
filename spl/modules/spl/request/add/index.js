// spl/request/add
// read from a folder - can be specific file
const fs = require('fs'); 

function spl_request_add ( input ) {

    const spl = input.headers.spl;
    spl.data = spl.request.data;
    spl.data_next = "spl/data/add";
    spl.request.status = "data";
    return input;
}
exports.default = spl_request_add;