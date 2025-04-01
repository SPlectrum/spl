// spl/execute/set-next
// sets next action from pipeline

function spl_execute_set_next ( input ) {
    if (!(input.headers.spl.execute.pipeline === undefined)  && input.headers.spl.execute.pipeline.length > 0) {
        var action = input.headers.spl.execute.pipeline.shift();
        action.value = input.value.value;
        input.value = action;
        input.headers.spl.execute.action = "spl/execute/next";
    } else input.headers.spl.execute.action = "spl/execute/complete";
    return input;
}

exports.default = spl_execute_set_next;
