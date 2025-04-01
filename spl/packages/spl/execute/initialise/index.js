// spl/execute/initialise
// entry point for request executio, initialise execution

function spl_execute_initialise ( input ) {
    input.headers.spl.execute.action = "spl/execute/next";
    input.headers.spl.execute.status = "executing";
    return input;
}

exports.default = spl_execute_initialise;