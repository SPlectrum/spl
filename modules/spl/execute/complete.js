//  name        Complete Execution
//  URI         spl/execute/complete
//  type        API Method
//  description The last action of an action pipeline.
//              Every continuous execution of a pipeline should finish with a complete action.
//              This should happen after new execution segments have been spawned (if there are any)
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_complete ( input ) {
    spl.setContext ( input, "finishTime", Date.now() );
    spl.setContext( input, "duration", spl.context ( input, "finishTime" ) - spl.context( input, "startTime" ) );
}
///////////////////////////////////////////////////////////////////////////////
