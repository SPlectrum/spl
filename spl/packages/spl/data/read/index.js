// spl/data/read
// puts a request on to a folder
const fs = require('fs'); 

function spl_data_read ( input ) {
    const spl = input.headers.spl;
    const cwd = spl.execute.cwd;
    const folder = spl.data.fs.folder;
    var file = spl.data.fs.file;
    if (file === undefined) {
        file = fs.readdirSync(`${cwd}/${folder}`).filter(el => require('path').extname(el) === '.json').sort().reverse()[0];
    }
    input = fs.readFileSync(`${cwd}/${folder}/${file}`, 'utf8');
    input = JSON.parse(input);
    input.headers.spl = spl;
    
    spl.request.status = "completed";
    return input;
}
exports.default = spl_data_read;