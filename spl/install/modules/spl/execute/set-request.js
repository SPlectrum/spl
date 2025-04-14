// spl/execute/set-request
// replaces current action with a new action command (data -> header), returns execute/next

exports.default = function spl_execute_set_request ( input ) {
    const execute = input.headers.spl.execute;
    execute.action = "spl/execute/next";
    input.headers.spl.request = input.value.headers.spl.request;
    input.value = input.value.value;
    return input;
}
