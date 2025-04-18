// spl/data/queue
// puts a request on the request queue
const data = require("./data.js")

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

exports.default = function spl_data_queue ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    var session = input.headers.spl.execute.session;
    if( session !== "boot" && session !== "system" ) session = `sessions/${session}`;

    data.writeFileRecord(`${cwd}/runtime/${session}/requests/queue`, input);

    return input;
}
