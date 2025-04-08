// spl/execute/next
// executes next action and sets next execute command

function spl_execute_next ( input ) {

    const execute = input.headers.spl.execute;
    const request = input.headers.spl.request;
    const cwd = execute.cwd;
    const action = request.action;
    input = require(`${cwd}/modules/${action}`).default(input);
    switch(request.status){
        case "data": execute.action = request.data.next; break;
        case "error": execute.action = request.error.next; break;
        case "execute": execute.action = request.execute.next; break;
        case "completed": execute.action = "spl/execute/set-next"; break;
        default: execute.action = "spl/execute/action-error";
    }
    return input;
}

exports.default = spl_execute_next;
