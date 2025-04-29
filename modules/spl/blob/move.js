//  name        Move one or more files or dirs
//  URI         spl/blob/move
//  type        API Method
//  description This method moves one or more files or dirs.
//              This method executes asynchrounously.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const blob = require("./blob.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_blob_move ( input ) {
    const cwd = input.headers.spl.execute.cwd;
    var sources = input.headers.spl.blob.move;
    if ( !Array.isArray(sources) ) sources = [ sources ];

    for ( var i=0; i<sources.length; i++ ) {
        const fromPath = `${sources[i].from.repo}/${sources[i].from.dir}/${((sources[i].from.file===undefined)?"":sources[i].from.file)}`;
        const toPath = `${sources[i].to.repo}/${sources[i].to.dir}/${((sources[i].to.file===undefined)?"":sources[i].to.file)}`;
        blob.moveFile ( blob.path(cwd, fromPath ), blob.path(cwd, toPath ) );
        input.headers.spl.blob.history.push ( `move ${fromPath} to ${toPath}` );
    }
    delete input.headers.spl.blob.move;
    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
