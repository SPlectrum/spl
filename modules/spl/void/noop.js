//  name        No Operation
//  URI         spl/void/noop
//  type        API Method
//  description This command does not execute any action.
//              It is included to facilitate testing.
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_void_noop (input) { 
    input.headers.spl.request.status = "completed";
}
///////////////////////////////////////////////////////////////////////////////
