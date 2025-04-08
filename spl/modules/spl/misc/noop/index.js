// spl/misc/noop

function spl_misc_noop (input) { 
    input.headers.spl.request.status = "completed";
    return input 
} 
exports.default = spl_misc_noop;