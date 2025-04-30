//  name        Prints a trace a message
//  URI         spl/console/trace
//  type        API Method
//  description Print a trace message to the Console
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_console_trace (input) { 
    
    var message = spl.rcRef( input.headers, "spl.console.trace.message");
    if(message.join) message = message.join(" ");
    console.trace(message);
    delete input.headers.spl.console.trace;
    input.headers.spl.request.status = "completed";
    return input 
} 
///////////////////////////////////////////////////////////////////////////////
