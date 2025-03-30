// spl/misc/noop

function spl_misc_noop (input) { 
    input.headers.status = "completed";
    return input 
} 

exports.default = spl_misc_noop;