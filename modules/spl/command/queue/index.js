// spl/command/queue
// prepares a command for submission on the request queue
const spl = require("../../spl.js")

function spl_command_queue ( input ) {
    inputSpl = input.headers.spl;

    inputSpl.command = input.value;

    inputSpl.execute.action = "spl/execute/initialise";
    inputSpl.execute.status = "new";
    inputSpl.execute.session = inputSpl.command.session;

    inputSpl.request = { action: "spl/command/execute", status: "pending" }

    return spl.moduleAction(input,"spl/data/queue");
}
exports.default = spl_command_queue;