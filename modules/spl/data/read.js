// spl/data/read
// puts a request on to a folder
const spl = require("../spl.js")
const data = require("./data.js")

exports.default = function spl_data_read ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const sources = input.headers.spl.data.read;

    for ( var i=0; i<sources.length; i++ ) {
        
        const folderPath = `${sources[i].repo}/${sources[i].folder}`;
        const output = data.readFileRecord(`${cwd}/${folderPath}`);
        spl.rcSet ( output.contents, "headers.data.location", { repo: sources[i].repo, folder: sources[i].folder, file: output.file } );
        spl.wsSet ( input, `spl/data.${folderPath}`, output.contents );
        input.headers.spl.data.history.push(`read ${folderPath}/${output.file}}`);
        if( sources[i].copy ) spl.wsSet( input, sources[i].copy, structuredClone(output.contents) );
        if( sources[i].reference ) spl.wsSet( input, sources[i].reference, output.contents );
    }

    delete input.headers.spl.data.read;
    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
