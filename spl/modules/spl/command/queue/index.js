// spl/command/queue
// prepares a command for submission on the request queue
const spl = require("../../spl.js")

function spl_command_queue ( input ) {

    const command = input.value;
    input.headers.spl = 
    { 
        command: command,
        execute: { action: "spl/execute/initialise", status: "new", session: command.session, cwd: command.cwd },
        request: { action: "spl/command/execute", status: "pending" }
    };

    return spl.moduleAction(input,"spl/data/queue");
}
exports.default = spl_command_queue;