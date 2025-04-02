// spl/data/write
// puts a request on to a folder
const fs = require('fs'); 

function spl_data_write ( input ) {
    const cwd = input.headers.spl.execute.cwd;
    const folder = input.headers.spl.data.fs.folder;

    var suffix = 0;
    const filename = `${cwd}/${folder}/${Date.now().toString()}`;
    fs.writeFileSync(`${filename}.tmp`, JSON.stringify(input));

    while(fs.existsSync(`${filename}${suffix.toString()}.json`)) suffix += 1;
    fs.renameSync(`${filename}.tmp`,`${filename}${suffix.toString()}.json`)

    return input;
}
exports.default = spl_data_write;