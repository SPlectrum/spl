// spl/data/add-folders
// puts a request on to a folder
const fs = require('fs'); 

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

function spl_data_add_folders ( input ) {
    const spl = input.headers.spl;
    const cwd = spl.execute.cwd;
    const data = spl.data;
    const repo = data.repo;
    const folder = data.folder;

    spl.execute.action = "spl/execute/set-next";
    spl.request.status = "completed";
    return input;
}
exports.default = spl_data_add_folders;