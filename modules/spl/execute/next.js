//  name        Executes the next action
//  URI         spl/execution/next
//  type        API Method
//  description Executes the next action request.
//              It also routes data and error tasks raised by the request action.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_next ( input ) {
    const splExecute = input.headers.spl.execute;
    const splRequest = input.headers.spl.request;
    spl.moduleAction(input, splRequest.action);
    switch(splRequest.status) {
        case "data": splExecute.action = splRequest.data_next; splExecute.repeatRequest = splRequest.repeat; break;
        case "blob": splExecute.action = splRequest.blob_next; splExecute.repeatRequest = splRequest.repeat; break;
        case "error": splExecute.action = input.headers.spl.request.error_next; break;
        case "execute": splExecute.action = input.headers.spl.request.execute_next; break;
        case "completed": splExecute.action = "spl/execute/set-next"; break;
        default: splExecute.action = "spl/execute/complete";
    }
}
///////////////////////////////////////////////////////////////////////////////
