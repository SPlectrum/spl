// spl/console/log

exports.default = function spl_console_log (input) { 
    
    var message = input.value["spl/console/log"].message;
    if(message.join) message = message.join(" ");
    console.log(message);

    input.headers.spl.request.status = "completed";
    return input 
} 
