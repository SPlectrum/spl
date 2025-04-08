// spl/request/read
// read from a folder - can be specific file
const fs = require('fs'); 

function spl_request_read ( input ) {

    const spl = input.headers.spl;
    spl.data = spl.request.data;
    spl.data.next = "spl/data/read";
    spl.request.status = "data";
    return input;
}
exports.default = spl_request_read;