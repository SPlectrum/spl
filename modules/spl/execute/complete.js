//  name        Complete Execution
//  URI         spl/execute/complete
//  type        API Method
//  description The last action of an action pipeline.
//              Every continuous execution of a pipeline should finish with a complete action.
//              This should happen after new execution segments have been spawned (if there are any)
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_complete ( input ) {
    
    input.headers.spl.execute.finishTime = Date.now();
    input.headers.spl.execute.duration = input.headers.spl.execute.finishTime - input.headers.spl.execute.startTime;
    return input;
}
///////////////////////////////////////////////////////////////////////////////
