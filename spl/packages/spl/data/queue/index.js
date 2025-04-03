// spl/data/write
// puts a request on to a folder
const fs = require('fs'); 

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

function spl_data_write ( input ) {

    const spl = input.headers.spl;
    const execute = spl.execute;
    const cwd = execute.cwd;
    var session = execute.session;
    if( session !== "boot" && session !== "system" ) session = `sessions/${session}`;

    var suffix = 0;
    const filename = `${cwd}/runtime/${session}/requests/queue/${Date.now().toString()}`;
    fs.writeFileSync(`${filename}.tmp`, JSON.stringify(input));

    while(fs.existsSync(`${filename}${suffix.toString()}.json`)) suffix += 1;
    fs.renameSync(`${filename}.tmp`,`${filename}${suffix.toString()}.json`)

    return input;
}
exports.default = spl_data_write;