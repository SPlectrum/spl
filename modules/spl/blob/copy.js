//  name        Copies one or more files or folders
//  URI         spl/blob/copy
//  type        API Method
//  description This method copies one or more files or folders.
//              This method executes asynchrounously.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const blob = require("./blob.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_blob_copy ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const sources = input.headers.spl.blob.copy;

    for ( var i=0; i<sources.length; i++ ) {

        const fromFolder = `${sources[i].from.repo}/${sources[i].from.folder}`;
        const fromFile = sources[i].from.file;
        const toFolder = `${sources[i].to.repo}/${sources[i].to.folder}`;
        const toFile = sources[i].to.file;
        blob.copyFile ( `${cwd}/${fromFolder}/${fromFile}`, `${cwd}/${toFolder}/${toFile}` );
        input.headers.spl.blob.history.push ( `copy from ${fromFolder}/${((fromFile===undefined)?"":fromFile)} to ${toFolder}/${((toFile===undefined)?"":toFile)}` );
    }

    delete input.headers.spl.blob.copy;
    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
