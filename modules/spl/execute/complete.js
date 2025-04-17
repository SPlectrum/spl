// spl/execute/complete
// finalises execution of a request

exports.default = function spl_execute_complete ( input ) {
    
    const splExecute = input.headers.spl.execute;
    splExecute.status = "completed";
    splExecute.finishTime = Date.now();
    splExecute.duration = splExecute.finishTime - splExecute.startTime;

    return input;
}
