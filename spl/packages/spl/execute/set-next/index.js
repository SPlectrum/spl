// spl/execute/set-next
// sets next action from pipeline

function spl_execute_set_next ( input ) {
    if (input.headers.pipeline.length > 0) {
        var action = input.headers.pipeline.shift();
        action.value = input.value.value;
        input.value = action;
        input.headers.action = "spl/execute/next";
    } else input.headers.action = "spl/execute/complete";
    return input;
}

exports.default = spl_execute_set_next;
