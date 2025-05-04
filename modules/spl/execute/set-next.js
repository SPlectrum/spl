//  name        Set Next Request
//  URI         spl/execute/set-next
//  type        API Method
//  description Sets the next request action to execute from the execution pipeline.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_set_next ( input ) {
    const splExecute = input.headers.spl.execute;
    if(splExecute.repeatRequest) {
        splExecute.repeatRequest = false;
        splExecute.action = "spl/execute/next";
    }
    else if (!(splExecute.pipeline === undefined)  && splExecute.pipeline.length > 0) {
        input.headers.spl.request = splExecute.pipeline.shift();
        const splRequest = input.headers.spl.request;
        const requestAction = splRequest.action;
        if (splRequest[requestAction]) spl.rcSet( input.headers, requestAction.replaceAll("/","."), splRequest[requestAction] );
        if( splRequest.TTL > 0 ) splExecute.TTL = splRequest.TTL;
        splExecute.action = "spl/execute/next";
    } 
    else splExecute.action = "spl/execute/complete";
}
///////////////////////////////////////////////////////////////////////////////
