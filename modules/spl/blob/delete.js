//  name        Delete File or Folder
//  URI         spl/blob/delete
//  type        API Method
//  description This method deletes one or more files or folders
//              This method executes asynchrounously.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const blob = require("./blob.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_blob_delete ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const sources = input.headers.spl.blob.delete;

    for ( var i=0; i<sources.length; i++ ) {

        const folder = `${sources[i].repo}/${sources[i].folder}`;
        const file = sources[i].file;
        if( file === undefined ) blob.removeFolder ( `${cwd}/${folder}` );
        else blob.deleteFile ( `${cwd}/${folder}/${file}` );
        input.headers.spl.blob.history.push ( `delete ${folder}/${file}/${((file===undefined)?"":file)}` );
    }

    delete input.headers.spl.blob.delete;
    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
