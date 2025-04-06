// spl/data/write
// puts a request on to a folder
const fs = require('fs'); 

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

function spl_data_write ( input ) {
    const spl = input.headers.spl;
    const cwd = spl.execute.cwd;
    const data = spl.data;
    const repo = data.repo;
    const folder = data.folder;

    // the spl data structure in the header is runtime stuff
    // it should be removed for 'static' storage
    delete input.headers.spl;

    var suffix = 0;
    const filename = `${cwd}/${repo}/${folder}/${Date.now().toString()}`;
    fs.writeFileSync(`${filename}.tmp`, JSON.stringify(input,null,2));

    while(fs.existsSync(`${filename}${suffix.toString()}.json`)) suffix += 1;
    fs.renameSync(`${filename}.tmp`,`${filename}${suffix.toString()}.json`)

    input.headers.spl = spl;
    spl.execute.action = "spl/execute/set-next";
    spl.request.status = "completed";
    return input;
}
exports.default = spl_data_write;