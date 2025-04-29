//  name        Delete File or Dir
//  URI         spl/blob/delete
//  type        API Method
//  description This method deletes one or more files or dirs
//              This method executes asynchrounously.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const blob = require("./blob.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_blob_delete ( input ) {
    const cwd = input.headers.spl.execute.cwd;
    var sources = input.headers.spl.blob.delete;
    if ( !Array.isArray(sources) ) sources = [ sources ];

    for ( var i=0; i<sources.length; i++ ) {
        if( sources[i].file === undefined ) blob.deleteFile ( blob.path( cwd, sources[i].repo, sources[i].dir ) );
        else blob.deleteFile ( blob.path( cwd, sources[i].repo, sources[i].dir, sources[i].file ) );
        input.headers.spl.blob.history.push ( `delete ${sources[i].repo}/${sources[i].dir}/${((sources[i].file===undefined)?"":sources[i].file)}` );
    }
    delete input.headers.spl.blob.delete;
    input.headers.spl.execute.action = "spl/execute/set-next";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
