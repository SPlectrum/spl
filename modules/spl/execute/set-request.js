// spl/execute/set-request
// replaces current action with a new action command (data -> header), returns execute/next
const spl = require("../spl")

exports.default = function spl_execute_set_request ( input ) {

    const newRequest = spl.wsRef(input, "spl/execute/set-request");
    input.headers.spl.request = newRequest.headers.spl.request;
    for(key in newRequest.value) spl.wsSet(input, key, newRequest.value[key]);

    input.headers.spl.execute.action = "spl/execute/next";
    return input;
}
