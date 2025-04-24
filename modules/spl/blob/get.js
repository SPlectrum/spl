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
        
        const folderPath = `${sources[i].repo}/${sources[i].folder}`;
        const file = `${sources[i].file}`;
        const output = data.getFile(`${cwd}/${folderPath}`);
        spl.rcSet ( output.contents, "headers.blob.location", { repo: sources[i].repo, folder: sources[i].folder, file: output.file } );
        spl.wsSet ( input, `spl/blob.${folderPath}`, output.contents );
        input.headers.spl.data.history.push(`read ${folderPath}/${output.file}}`);
        if( sources[i].copy ) 
            for(var j=0; j<sources[i].copy.length; j++) 
                spl.wsSet( input, sources[i].copy[j], structuredClone(output.contents) );
        if( sources[i].reference ) 
            for(var j=0; j<sources[i].reference.length; j++) 
                pl.wsSet( input, sources[i].reference[j], output.contents );
    }

    delete input.headers.spl.blob/get;
    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
