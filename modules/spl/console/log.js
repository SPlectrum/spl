// spl/console/log
const spl = require("../spl")

exports.default = function spl_console_log (input) { 
    
    var message = spl.wsRef( input, "spl/console/log").value.message;
    if(message.join) message = message.join(" ");
    console.log(message);

    input.headers.spl.request.status = "completed";
    return input 
} 
