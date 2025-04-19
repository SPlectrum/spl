// spl/data/put
// puts a file or a folder onto the filesystem
const spl = require("../spl.js")
const data = require("./data.js")

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

exports.default = function spl_data_put ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const sources = input.headers.spl.data.put;

    for ( var i=0; i<sources.length; i++ ) {

        const folder = `${sources[i].repo}/${sources[i].folder}`;
        const file = sources[i].file;
        if( file === undefined ) data.addFolder ( `${cwd}/${folder}` );
        else {
            const contents = spl.wsGet( input, `spl/data.${folder}/${file.replace(".","_")}` );
            data.putFile ( `${cwd}/${folder}/${file}`, JSON.stringify(contents, null, 2) );
        }
        input.headers.spl.data.history.push ( `put ${folder}/${file}` );
    }

    delete input.headers.spl.data.put;
    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
