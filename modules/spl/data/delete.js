//  name        Delete File or Folder
//  URI         spl/data/delete
//  type        API Method
//  description This method deletes one or more files or folders
//              THis method executes synchrounously.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const data = require("./data.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_data_delete ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const sources = input.headers.spl.data.delete;

    for ( var i=0; i<sources.length; i++ ) {

        const folder = `${sources[i].repo}/${sources[i].folder}`;
        const file = `${sources[i].repo}/${sources[i].file}`;
        if( file === undefined ) data.removeFolder ( `${cwd}/${folder}` );
        else data.deleteFile ( `${cwd}/${folder}/file` ) );
        input.headers.spl.data.history.push ( `delete ${folderPath}/${fileName}/${file}` );
    }

    delete input.headers.spl.data.delete;
    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
