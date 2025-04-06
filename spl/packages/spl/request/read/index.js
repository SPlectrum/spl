// spl/request/read
// read from a folder - can be specific file
const fs = require('fs'); 

function spl_request_read ( input ) {

    const spl = input.headers.spl;
    spl.data = spl.request.data;
    spl.request.status = "data/read";
    return input;
}
exports.default = spl_request_read;