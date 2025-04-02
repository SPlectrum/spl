// spl/request/queue
// puts a request on the queue
const fs = require('fs'); 

function spl_request_queue ( input ) {

    // This action is always executed inline, never via the queue
    const execute = input.headers.spl.execute;
    if( execute.action === "spl/execute/queue") throw("The spl.execute.queue command can not be set by the execution context");

    // the input is written to the request queue as is
    var session = execute.session;
    if( session !== "boot" && session !== "system" ) session = `sessions/${session}`;

    var suffix = 0;
    const filename = `${execute.cwd}/runtime/${session}/requests/queue/${Date.now().toString()}`;
    fs.writeFileSync(`${filename}.tmp`, JSON.stringify(input));

    while(fs.existsSync(`${filename}${suffix.toString()}.json`)) suffix += 1;
    fs.renameSync(`${filename}.tmp`,`${filename}${suffix.toString()}.json`)

    return input;
}

exports.default = spl_request_queue;