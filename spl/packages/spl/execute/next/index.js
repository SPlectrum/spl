// spl/execute/next
// executes next action and sets next execute command

function spl_execute_next ( input ) {

    const execute = input.headers.spl.execute;
    const request = input.headers.spl.request;
    const cwd = execute.cwd;
    const action = request.action;
    input = require(`${cwd}/packages/${action}`).default(input);
    switch(request.status){
        case "data/read": execute.action = "spl/data/read"; break;
        case "data/write": execute.action = "spl/data/write"; break;
        case "new-request": execute.action = "spl/execute/set-request"; break;
        case "new-pipeline": execute.action = "spl/execute/set-pipeline"; break;
        case "completed": execute.action = "spl/execute/set-next"; break;
        default: execute.action = "spl/execute/action-error";
    }
    return input;
}

exports.default = spl_execute_next;
