//  name        Write one or more Data Records
//  URI         spl/data/write
//  type        API Method
//  description Writes a new data record to a dir.
//              It creates a timestamp filename.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const data = require("./data.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_data_write ( input ) {
    const cwd = input.headers.spl.execute.cwd;
    const sources = input.headers.spl.data.write;

    for ( var i=0; i<sources.length; i++ ) {
        const dirPath = `${sources[i].repo}/${sources[i].dir}`;
        const fileName = data.writeFileRecord ( data.path ( cwd, dirPath ), spl.wsGet( input, `spl/data.${dirPath}` ) );
        spl.rcSet( input.value["spl/data"][dirPath], "headers.spl.data.file", fileName );
        input.headers.spl.data.history.push(`write ${dirPath}/${fileName}}`);
    }
    delete input.headers.spl.data.write;
    input.headers.spl.execute.action = "spl/execute/set-next";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
