// spl/execute/initialise
// entry point for request execution, initialise execution

function spl_execute_initialise ( input ) {
    const execute = input.headers.spl.execute;
    execute.action = "spl/execute/next";
    execute.status = "executing";
    return input;
}
exports.default = spl_execute_initialise;
