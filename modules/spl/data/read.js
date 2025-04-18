// spl/data/read
// puts a request on to a folder
const spl = require("../spl.js")
const data = require("./data.js")

exports.default = function spl_data_read ( input ) {

    const inputSpl = input.headers.spl;
    const cwd = inputSpl.execute.cwd;
    const sources = inputSpl.data.read;

    for ( var i=0; i<sources.length; i++ ) {
        
        const folderPath = `${sources[i].repo}/${sources[i].folder}`;
        const output = data.readFileRecord(`${cwd}/${folderPath}`);
        spl.wsSet ( input, `spl/data.${folderPath}`, output.contents );
        spl.setProperty ( input.value["spl/data"][folderPath], "headers.data.location", { repo: sources[i].repo, folder: sources[i].folder, file: output.file } );
        inputSpl.data.history.push(`read ${folderPath}/${output.file}}`);
    }

    delete inputSpl.data.read;
    inputSpl.execute.action = "spl/execute/set-next";
    inputSpl.request.status = "completed";
    return input;
}
