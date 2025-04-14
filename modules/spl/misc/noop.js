// spl/misc/noop

exports.default = function spl_misc_noop (input) { 
    input.headers.spl.request.status = "completed";
    return input 
}
