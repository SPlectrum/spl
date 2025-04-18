// spl/execute/complete
// finalises execution of a request

exports.default = function spl_execute_complete ( input ) {
    
    input.headers.spl.execute.status = "completed";
    input.headers.spl.execute.finishTime = Date.now();
    input.headers.spl.execute.duration = input.headers.spl.execute.finishTime - input.headers.spl.execute.startTime;

    return input;
}
