// spl/execute/complete
// finalises execution of a request

function spl_execute_complete ( input ) {
    const execute = input.headers.spl.execute;
    execute.action = "";
    execute.status = "completed";
    input.value = null;
    return input;
}
exports.default = spl_execute_complete;
