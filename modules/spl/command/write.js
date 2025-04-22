//  name        Write Command Record
//  URI         spl/command/write
//  type        API Method
//  description Writes a commasnd record to a folder - either requests or responses.
//              It creates a timestamp filename.
//              This method is used to log the initial and completed command.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_write ( input ) {
    
    const repo = "data";
    const folder = `clients/${input.headers.spl.execute.session}/${input.headers.spl.request.destination}`
    const folderPath = `${repo}/${folder}`;

    input.headers.spl.data.write = [ { repo: repo, folder: folder } ];

    const spl_command = spl.wsGet(input,"spl/command");
    const responseValue = {
        headers: { data: { location: { repo: repo, folder:folder } } },
        value: {
            "spl/command": spl_command
        }
    }
    for(key in spl_command.parsed) responseValue.value[key] = input.value[key];
    spl.wsSet(input, `spl/data.${folderPath}`, responseValue)

    input.headers.spl.request.data_next = "spl/data/write";
    input.headers.spl.request.status = "data";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
