// spl/data/add
// create a set of folders and files from the struccture supplied in input.value
const data = require("../data.js")

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

function spl_data_add ( input ) {
    const inputSpl = input.headers.spl;
    const cwd = inputSpl.execute.cwd;
    const repo = inputSpl.data.repo;
    const folder = inputSpl.data.folder;
    
    data.removeFolder(`${cwd}/${repo}/${folder}`);

    spl.execute.action = "spl/execute/set-next";
    spl.request.status = "completed";
    return input;
}
exports.default = spl_data_add;