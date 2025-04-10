// spl/data/write
// puts a request on to a folder
const data = require("../data.js")

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

function spl_data_write ( input ) {
    const inputSpl = input.headers.spl;
    const cwd = inputSpl.execute.cwd;
    const repo = inputSpl.data.repo;
    const folder = inputSpl.data.folder;

    // the spl data structure in the header is runtime stuff
    // it should be removed for 'static' storage
    delete input.headers.spl;
    delete input.headers.data;

    inputSpl.data.file = data.writeFileRecord(`${cwd}/${repo}/${folder}`, input);
    
    input.headers.spl = inputSpl;
    input.headers.data = inputSpl.data;
    inputSpl.execute.action = "spl/execute/set-next";
    inputSpl.request.status = "completed";
    return input;
}
exports.default = spl_data_write;