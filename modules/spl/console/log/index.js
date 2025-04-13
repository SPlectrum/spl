// spl/console/log

function spl_console_log (input) { 
    

    console.log(input.value);
    input.headers.spl.request.status = "completed";
    return input 
} 

exports.default = spl_console_log;