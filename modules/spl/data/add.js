// spl/data/add
// create a set of folders and files from the struccture supplied in input.value
const data = require("./data.js")

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

exports.default = function spl_data_add ( input ) {
    
    const cwd = input.headers.spl.execute.cwd;
    const repo = input.headers.spl.data.repo;
    const folder = input.headers.spl.data.folder;

    const foldersFiles = spl.wsRef(input,"spl/data/add").value;
    for ( key in foldersFiles ) {
        data.addFolder(`${cwd}/${repo}/${folder}/${key}`);
        for( var i=0; i<foldersFiles[key].length; i++ ) 
            data.putFile(`${cwd}/${repo}/${folder}/${key}/${foldersFiles[key][i].file}`, foldersFiles[key][i].contents);
    }

    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
