// spl/data/write
// puts a request on to a folder
const fs = require('fs'); 

function spl_data_write ( input ) {

    // the input is written to the request queue as is
    var session = input.headers.spl.execute.session;
    if( session !== "boot" && session !== "system" ) session = `sessions/${session}`;

    var suffix = 0;
    const filename = `${input.headers.spl.execute.cwd}/runtime/${session}/requests/queue/${Date.now().toString()}`;
    fs.writeFileSync(`${filename}.tmp`, JSON.stringify(input));

    while(fs.existsSync(`${filename}${suffix.toString()}.json`)) suffix += 1;
    fs.renameSync(`${filename}.tmp`,`${filename}${suffix.toString()}.json`)

    return input;
}

exports.default = spl_data_write;