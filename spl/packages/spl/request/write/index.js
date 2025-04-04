// spl/request/write
// Writes a file to a folder
const fs = require('fs'); 

function spl_request_write ( input ) {
    const spl = input.headers.spl;
    spl.data = spl.request.data;
    spl.request.status = "data/write";
    return input;
}
exports.default = spl_request_write;