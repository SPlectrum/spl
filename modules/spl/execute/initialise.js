//  name        Executes the Initialise Action
//  URI         spl/execute/initialise
//  type        API Method
//  description Initialises the execution of a pipeline segemnt.
//              The output of this action is logged.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_initialise ( input ) {
    spl.setContext ( input, "pipeline", [ spl.request ( input ) ]);
    spl.setContext ( input, "startTime", Date.now() );
    if( spl.context ( input, "TTL" ) === undefined ) spl.setContext ( input, "TTL", 100 );
    spl.setContext ( input, "history", [] );
 
    input.headers.spl.data = { history: [] };
    input.headers.spl.blob = { history: [] };
 
    spl.setContext ( input, "action", "spl/execute/set-next" );
}
///////////////////////////////////////////////////////////////////////////////
