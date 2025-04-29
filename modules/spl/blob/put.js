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

        if( sources[i].file === undefined ) blob.addDir ( blob.path( cwd, sources[i].repo, sources[i].dir ) );
        else {
            const contents = spl.wsGet( input, `spl/blob.${sources[i].repo}/${sources[i].dir}/${sources[i].file.replace(".","_")}` );
            blob.putFile ( blob.path( cwd, sources[i].repo, sources[i].dir, sources[i].file ), JSON.stringify(contents, null, 2) );
        }
        input.headers.spl.blob.history.push ( `put ${sources[i].repo}/${sources[i].dir}/${((sources[i].file===undefined)?"":sources[i].file)}` );
    }
    delete input.headers.spl.blob.put;
    input.headers.spl.execute.action = "spl/execute/set-next";
    return input; 

}
///////////////////////////////////////////////////////////////////////////////
