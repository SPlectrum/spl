// spl/command/queue
// prepares a command for submission on the request queue
const spl = require("../spl.js")

exports.default = function spl_command_queue ( input ) {
    var exec = input.headers.spl.execute;
    input.headers.spl = {
        command: input.value,
        execute: { action: "spl/execute/initialise", status: "new", session: input.value.session, cwd: exec.cwd, modules: exec.modules },
        request: { action: "spl/command/execute", status: "pending" }
    }

    return spl.moduleAction(input,"spl/data/queue");
}
