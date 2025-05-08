//  name        Executes the Initialise Action
//  URI         spl/execute/initialise
//  type        API Method
//  description Initialises the execution of a pipeline segemnt.
//              The output of this action is logged.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_initialise ( input ) {
    spl.setContext ( input, "pipeline", [ ]);
    spl.setContext ( input, "startTime", Date.now() );
    if( spl.context ( input, "TTL" ) === undefined ) spl.setContext ( input, "TTL", 100 );
    spl.setContext ( input, "status", "green" );
    spl.setContext ( input, "action", "spl/execute/next" );
}
///////////////////////////////////////////////////////////////////////////////
