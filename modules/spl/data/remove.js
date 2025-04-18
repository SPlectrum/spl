// spl/data/remove
// create a set of folders and files from the struccture supplied in input.value
const data = require("./data.js")

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

exports.default = function spl_data_remove ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const repo = input.headers.spl.data.repo;
    const folder = input.headers.spl.data.folder;
    const basePath = cwd + ((repo === "")?"":"/" + repo) + ((folder === "")?"":"/" + folder) 

    const folders = spl.wsRef(input,"spl/data/remove").value;
    for ( key in folders ) {
        console.log(`${basePath}/${key}`);
        data.removeFolder(`${basePath}/${key}`);
    }

    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
