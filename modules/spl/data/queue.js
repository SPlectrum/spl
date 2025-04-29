//  name        Queue an Action
//  URI         spl/data/queue
//  type        API Method
//  description Puts an Action request on the request queue
//              set in the execution header.
//              It writes it in Kafka record mode.
///////////////////////////////////////////////////////////////////////////////
const data = require("./data.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_data_queue ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    var session = input.headers.spl.execute.session;
    if( session !== "boot" && session !== "system" ) session = `sessions/${session}`;
    data.writeFileRecord ( data.path( cwd, "runtime", session, "requests/queue" ), input );
    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
