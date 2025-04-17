// spl/execute/initialise
// entry point for request execution, initialise execution

exports.default = function spl_execute_initialise ( input ) {

    const splExecute = input.headers.spl.execute;
    splExecute.startTime = Date.now();
    if( splExecute.TTL === undefined ) splExecute.TTL = 100;
    input.headers.spl.execute.history = [];
    input.headers.spl.data = { history: [] };

    splExecute.action = "spl/execute/next";
    splExecute.status = "executing";

    return input;
}
