// spl/request/read
// read from a folder - can be specific file
const fs = require('fs'); 

function spl_request_read ( input ) {

    const spl = input.headers.spl;
    const read = input.value;

    spl.data.folder = read.folder;
    if(read.file === undefined) spl.data.file = read.file;
    
    spl.request.status = "data/read";
    return input;
}
exports.default = spl_request_read;