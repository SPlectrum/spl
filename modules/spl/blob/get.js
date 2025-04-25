//  name        Gets the contents of a file
//  URI         spl/blob/get
//  type        API Method
//  description Gets the contenst of one or more files.
//              Currently only implemented for urf8
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const blob = require("./blob.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_blob_get ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const sources = input.headers.spl.blob.get;

    for ( var i=0; i<sources.length; i++ ) {
        
        const filePath = `${sources[i].repo}/${sources[i].folder}/${sources[i].file}`;
        const output = blob.getFile(`${cwd}/${filePath}`);
        spl.wsSet ( input, `spl/blob.${filePath}`, output );
        input.headers.spl.blob.history.push(`read ${filePath}}`);
        if( sources[i].copy ) 
            for(var j=0; j<sources[i].copy.length; j++) 
                spl.wsSet( input, sources[i].copy[j], structuredClone(output) );
        if( sources[i].reference ) 
            for(var j=0; j<sources[i].reference.length; j++) 
                pl.wsSet( input, sources[i].reference[j], output );
        input.headers.spl.blob.history.push ( `get ${folder}/${((file===undefined)?"":file)}` );
    }

    delete input.headers.spl.blob.get;
    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
