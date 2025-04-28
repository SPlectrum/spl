//  name        Executes the next action
//  URI         spl/execution/next
//  type        API Method
//  description Executes the next action request.
//              It also routes data and error tasks raised by the request action.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_next ( input ) {

    input = spl.moduleAction(input, input.headers.spl.request.action);
    switch(input.headers.spl.request.status) {
        case "data": 
            input.headers.spl.execute.action = input.headers.spl.request.data_next; 
            if( input.headers.spl.request.repeat ){
                input.headers.spl.execute.repeatRequest = true;
                input.headers.spl.request.repeat = false;
            }
        break;
        case "blob": 
            input.headers.spl.execute.action = input.headers.spl.request.blob_next; 
            if( input.headers.spl.request.repeat ){
                input.headers.spl.execute.repeatRequest = true;
                input.headers.spl.request.repeat = false;
            }
        break;
        case "error": 
            input.headers.spl.execute.action = input.headers.spl.request.error_next;
        break;
        case "execute": 
            input.headers.spl.execute.action = input.headers.spl.request.execute_next; 
        break;
        case "completed": 
            input.headers.spl.execute.action = "spl/execute/set-next"; 
        break;
        default: input.headers.spl.execute.action = "spl/execute/complete";
    }
    return input;
}
///////////////////////////////////////////////////////////////////////////////
