// spl/execute/next
// executes next action and sets next execute command

function spl_execute_next ( input ) {

    var action = input.value.headers.action;
    const executor = require(`../../../${action}`).default;
    input.value = executor(input.value);
    switch(input.value.headers.status){
        case "new-command": input.headers.action = "spl/execute/set-command"; break;
        case "new-pipeline": input.headers.action = "spl/execute/set-pipeline"; break;
        case "completed": input.headers.action = "execute/set-next"; break;
        default: input.headers.action = "spl/execute/action-error";
    }
    return input;
}

exports.default = spl_execute_next;
