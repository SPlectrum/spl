// spl/data/read
// puts a request on to a folder
const fs = require('fs'); 

function spl_data_read ( input ) {
    const spl = input.headers.spl;
    const cwd = spl.execute.cwd;
    const repo = spl.data.repo;
    const folder = spl.data.folder;
    var file = spl.data.file;
    if (file === undefined) {
        file = fs.readdirSync(`${cwd}/${repo}/${folder}`).filter(el => require('path').extname(el) === '.json').sort().reverse()[0];
    }
    input = fs.readFileSync(`${cwd}/${repo}/${folder}/${file}`, 'utf8');
    input = JSON.parse(input);
    input.headers.spl = spl;

    // add data location details
    if(input.headers.data == undefined) input.headers.data = {};
    if(input.headers.data.location == undefined) input.headers.data.location = {};
    const location = input.headers.data.location;
    location.repo = repo;
    location.folder = folder;
    location.file = file;

    spl.execute.action = "spl/execute/set-next";
    spl.request.status = "completed";
    return input;
}
exports.default = spl_data_read;