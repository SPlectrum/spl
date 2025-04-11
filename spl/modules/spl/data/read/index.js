// spl/data/read
// puts a request on to a folder
const spl = require("../../spl.js")
const data = require("../data.js")

function spl_data_read ( input ) {
    const inputSpl = input.headers.spl;
    const cwd = inputSpl.execute.cwd;
    const repo = inputSpl.data.repo;
    const folder = inputSpl.data.folder;
    var file = inputSpl.data.file;

    const output = data.readFileRecord(`${cwd}/${repo}/${folder}`, inputSpl.data.file);
    input = output.contents;
    input.headers.spl = inputSpl;
    input.headers.data = input.headers.spl.data;
    input.headers.data.file = output.file;

    // add data location details
    spl.setProperty ( input.headers, "data.location", { repo: repo, folder: folder, file: file } );

    inputSpl.execute.action = "spl/execute/set-next";
    inputSpl.request.status = "completed";
    return input;
}
exports.default = spl_data_read;