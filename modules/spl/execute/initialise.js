// spl/execute/initialise
// entry point for request execution, initialise execution

exports.default = function spl_execute_initialise ( input ) {

    input.headers.spl.execute.startTime = Date.now();
    if( input.headers.spl.execute.TTL === undefined ) input.headers.spl.execute.TTL = 100;
    input.headers.spl.execute.history = [];
    input.headers.spl.data = { history: [] };

    input.headers.spl.execute.action = "spl/execute/next";
    input.headers.spl.execute.status = "executing";

    return input;
}
