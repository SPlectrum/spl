const spl = require("../spl.js");
// spl/command/write
// Writes the request to a folder

exports.default = function spl_command_write ( input ) {
    
    const inputSpl = input.headers.spl;
    const repo = "data";
    const folder = `clients/${inputSpl.execute.session}/${inputSpl.request.destination}`
    const folderPath = `${repo}/${folder}`;

    inputSpl.data.write = [ { repo: repo, folder: folder } ];

    const responseValue = {
        headers: { data: { location: { repo: repo, folder:folder } } },
        value: {
            "spl/command": input.value["spl/command"]
        }
    }
    for(key in input.value["spl/command"].parsed) responseValue.value[key] = input.value[key];
    spl.wsSet(input, `spl/data.${folderPath}`, responseValue)

    inputSpl.request.data_next = "spl/data/write";
    inputSpl.request.status = "data";
    return input;
}
