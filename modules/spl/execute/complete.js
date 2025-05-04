//  name        Complete Execution
//  URI         spl/execute/complete
//  type        API Method
//  description The last action of an action pipeline.
//              Every continuous execution of a pipeline should finish with a complete action.
//              This should happen after new execution segments have been spawned (if there are any)
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_complete ( input ) {
    const splExecute = input.headers.spl.execute;
    splExecute.finishTime = Date.now();
    splExecute.duration = splExecute.finishTime - splExecute.startTime;
}
///////////////////////////////////////////////////////////////////////////////
