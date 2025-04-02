// spl/execute/set-command
// replaces current action with a new action command (data -> header), returns execute/next

function spl_execute_set_command ( input ) {
    const execute = input.headers.spl.execute;
    execute.action = "spl/execute/next";
    input.value = input.value.value;
    return input;
}

exports.default = spl_execute_set_command;