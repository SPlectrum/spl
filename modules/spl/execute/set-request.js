//  name        Set Request
//  URI         spl/execute/set-request
//  type        API Method
//  description This action sets a new request as first to be executed.
//              It leaves the current request pipeline untouched.
//              This is a flexible mechanism to inject what could be a full pipeline
//              into the existing execution flow.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_set_request ( input ) {

    const newRequest = spl.wsRef(input, "spl/execute/set-request");
    input.headers.spl.request = newRequest.headers.spl.request;
    if( input.headers.spl.request.TTL > 0 ) input.headers.spl.execute.TTL = input.headers.spl.request.TTL;
    for(key in newRequest.value) spl.wsSet(input, key, newRequest.value[key]);
    input.headers.spl.execute.action = "spl/execute/next";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
