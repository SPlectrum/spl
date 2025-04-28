//  name        Write one or more Data Records
//  URI         spl/data/write
//  type        API Method
//  description Writes a new data record to a folder.
//              It creates a timestamp filename.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const data = require("./data.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_data_write ( input ) {
    const cwd = input.headers.spl.execute.cwd;
    const sources = input.headers.spl.data.write;

    for ( var i=0; i<sources.length; i++ ) {
        const folderPath = `${sources[i].repo}/${sources[i].folder}`;
        const fileName = data.writeFileRecord ( data.path ( cwd, folderPath ), spl.wsGet( input, `spl/data.${folderPath}` ) );
        spl.rcSet( input.value["spl/data"][folderPath], "headers.spl.data.file", fileName );
        input.headers.spl.data.history.push(`write ${folderPath}/${fileName}}`);
    }
    delete input.headers.spl.data.write;
    input.headers.spl.execute.action = "spl/execute/set-next";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
