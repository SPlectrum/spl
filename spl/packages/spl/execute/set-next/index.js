// spl/execute/set-next
// sets next action from pipeline

function spl_execute_set_next ( input ) {
    const execute = input.headers.spl.execute;
    if (!(execute.pipeline === undefined)  && execute.pipeline.length > 0) {
        input.headers.spl.request = execute.pipeline.shift();
        input.headers.spl.execute.action = "spl/execute/next";
    } else input.headers.spl.execute.action = "spl/execute/complete";
    return input;
}
exports.default = spl_execute_set_next;
