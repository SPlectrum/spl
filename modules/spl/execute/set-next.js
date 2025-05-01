//  name        Set Next Request
//  URI         spl/execute/set-next
//  type        API Method
//  description Sets the next request action to execute from the execution pipeline.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_set_next ( input ) {

    if(input.headers.spl.execute.repeatRequest) {
        input.headers.spl.execute.repeatRequest = false;
        input.headers.spl.execute.action = "spl/execute/next";
    }
    else if (!(input.headers.spl.execute.pipeline === undefined)  && input.headers.spl.execute.pipeline.length > 0) {
        input.headers.spl.request = input.headers.spl.execute.pipeline.shift();
        const requestAction = input.headers.spl.request.action;
        if (input.headers.spl.request[requestAction]) spl.rcSet( input.headers, requestAction.replaceAll("/","."), input.headers.spl.request[requestAction] );
        if( input.headers.spl.request.TTL > 0 ) input.headers.spl.execute.TTL = input.headers.spl.request.TTL;
        input.headers.spl.execute.action = "spl/execute/next";
    } 
    else input.headers.spl.execute.action = "spl/execute/complete";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
