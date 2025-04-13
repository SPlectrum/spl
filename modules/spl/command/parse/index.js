// spl/command/parse

function spl_command_parse (input) { 

    input.value.comment = "The new spl/command/parse";
    input.headers.spl.request.execute_next = "spl/execute/set-request"
    input.headers.spl.request.status = "execute";
    input.value = {
        headers: { spl: { request: { action: "spl/console/log", status: "pending" } } },
        value: input.value
      }
    return input 
}
exports.default = spl_command_parse;
