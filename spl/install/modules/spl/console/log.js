// spl/console/log

exports.default = function spl_console_log (input) { 
    console.log(input.value);
    input.headers.spl.request.status = "completed";
    return input 
} 
