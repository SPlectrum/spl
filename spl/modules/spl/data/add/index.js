// spl/data/add
// create a set of folders and files from the struccture supplied in input.value
const fs = require('fs'); 

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

function spl_data_add ( input ) {
    const spl = input.headers.spl;
    const cwd = spl.execute.cwd;
    const data = spl.data;

    

    spl.data.action = "";
    spl.execute.action = "spl/execute/set-next";
    spl.request.status = "completed";
    return input;
}
exports.default = spl_data_add;