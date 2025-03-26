// spl/execute/set-command
// replaces current action with a new action command (data -> header), returns execute/next

function spl_execute_set_command ( input ) {
    input.value = input.value.value;
    input.headers.action = "spl/execute/next";
    return input;
}

exports.default = spl_execute_set_command;