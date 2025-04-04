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
console.log(`spl/data/read : ${cwd}/${repo}/${folder}/${file}`);    
    spl.execute.action = "spl/execute/set-next";
    spl.request.status = "completed";
    return input;
}
exports.default = spl_data_read;