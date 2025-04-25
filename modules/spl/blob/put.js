//  name        Put File 
//  URI         spl/blob/put
//  type        API Method
//  description Saves one or more blob files to the filesystem.
//              This method executes asynchronously.
//              Currenlty only implemented for utf8.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const blob = require("./blob.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_blob_put ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const sources = input.headers.spl.blob.put;

    for ( var i=0; i<sources.length; i++ ) {

        const folder = `${sources[i].repo}/${sources[i].folder}`;
        const file = sources[i].file;
        if( file === undefined ) blob.addFolder ( `${cwd}/${folder}` );
        else {
            const contents = spl.wsGet( input, `spl/blob.${folder}/${file.replace(".","_")}` );
            blob.putFile ( `${cwd}/${folder}/${file}`, JSON.stringify(contents, null, 2) );
        }
        input.headers.spl.blob.history.push ( `put ${folder}/${((file===undefined)?"":file)}` );
    }

    delete input.headers.spl.blob.put;
    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
