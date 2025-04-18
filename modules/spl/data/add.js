// spl/data/add
// create a set of folders and files from the struccture supplied in input.value
const data = require("./data.js")

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

exports.default = function spl_data_add ( input ) {
    
    const inputSpl = input.headers.spl;
    const cwd = inputSpl.execute.cwd;
    const repo = inputSpl.data.repo;
    const folder = inputSpl.data.folder;

    for ( key in input.value ) {
        data.addFolder(`${cwd}/${repo}/${folder}/${key}`);
        for( var i=0; i<input.value[key].length; i++ ) 
            data.putFile(`${cwd}/${repo}/${folder}/${key}/${input.value[key][i].file}`, input.value[key][i].contents);
    }

    inputSpl.execute.action = "spl/execute/set-next";
    inputSpl.request.status = "completed";
    return input;
}
