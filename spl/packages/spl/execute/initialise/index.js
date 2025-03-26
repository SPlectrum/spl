// spl/execute/initialise
// entry point for request executio, initialise execution

function spl_execute_initialise ( input ) {
    input.headers.action = "spl/execute/next";
    input.headers.status = "executing";
    return input;
}

exports.default = spl_execute_initialise;