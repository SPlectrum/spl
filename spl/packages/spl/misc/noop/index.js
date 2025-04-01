// spl/misc/noop

function spl_misc_noop (input) { 
    input.headers.spl.action.status = "completed";
    return input 
} 

exports.default = spl_misc_noop;