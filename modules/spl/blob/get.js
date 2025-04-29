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
        
        const output = blob.getFile( blob.path( cwd, sources[i].repo, sources[i].dir, sources[i].file ) );
        spl.wsSet ( input, `spl/blob.${spl.fURI ( sources[i].repo, sources[i].dir, sources[i].file )}`, output );
        if( sources[i].copy ) 
            for(var j=0; j<sources[i].copy.length; j++) 
                spl.wsSet( input, sources[i].copy[j], structuredClone(output) );
        if( sources[i].reference ) 
            for(var j=0; j<sources[i].reference.length; j++) 
                spl.wsSet( input, sources[i].reference[j], output );
        input.headers.spl.blob.history.push(`get ${spl.URI ( sources[i].repo, sources[i].dir, sources[i].file )}`);
    }
    delete input.headers.spl.blob.get;
    input.headers.spl.execute.action = "spl/execute/set-next";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
