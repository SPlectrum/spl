// spl/data/queue
// puts a request on the request queue
const data = require("../data.js")

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

function spl_data_queue ( input ) {

    const spl = input.headers.spl;
    const execute = spl.execute;
    const cwd = execute.cwd;
    var session = execute.session;
    if( session !== "boot" && session !== "system" ) session = `sessions/${session}`;

    data.writeFileRecord(`${cwd}/runtime/${session}/requests/queue`, input);

    return input;
}
exports.default = spl_data_queue;