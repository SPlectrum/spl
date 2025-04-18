// spl/data/write
// puts a request on to a folder
const spl = require("../spl.js")
const data = require("./data.js")

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

exports.default = function spl_data_write ( input ) {

    const inputSpl = input.headers.spl;
    const cwd = inputSpl.execute.cwd;
    const sources = inputSpl.data.write;

    for ( var i=0; i<sources.length; i++ ) {

        const folderPath = `${sources[i].repo}/${sources[i].folder}`;
        const fileName = data.writeFileRecord(`${cwd}/${folderPath}`, spl.wsGet(input, `spl/data.${folderPath}`));
        spl.setProperty(input.value["spl/data"][folderPath], "headers.data.location.file", fileName);
        input.headers.spl.data.history.push(`write ${folderPath}/${fileName}}`);
    }

    delete input.headers.spl.data.write;
    inputSpl.execute.action = "spl/execute/set-next";
    inputSpl.request.status = "completed";
    return input;
}
