// spl/execute/next
// executes next action and sets next execute command
const spl = require("../spl.js")

exports.default = function spl_execute_next ( input ) {

    const execute = input.headers.spl.execute;
    const request = input.headers.spl.request;
    const cwd = execute.cwd;
    const action = request.action;
    input = spl.requestAction(input);
    switch(request.status){
        case "data": execute.action = request.data_next; break;
        case "error": execute.action = request.error_next; break;
        case "execute": execute.action = request.execute_next; break;
        case "completed": execute.action = "spl/execute/set-next"; break;
        default: execute.action = "spl/execute/complete";
    }
    return input;
}
