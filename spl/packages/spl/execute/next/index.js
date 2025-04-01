// spl/execute/next
// executes next action and sets next execute command

function spl_execute_next ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const action = input.value.headers.spl.action.action;
    input.value = require(`${cwd}/packages/${action}`).default(input.value);
    switch(input.value.headers.spl.action.status){
        case "new-command": input.headers.spl.execute.action = "spl/execute/set-command"; break;
        case "new-pipeline": input.headers.spl.execute.action = "spl/execute/set-pipeline"; break;
        case "completed": input.headers.spl.execute.action = "spl/execute/set-next"; break;
        default: input.headers.spl.execute.action = "spl/execute/action-error";
    }
    return input;
}

exports.default = spl_execute_next;
