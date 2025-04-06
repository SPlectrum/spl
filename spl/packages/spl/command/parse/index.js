// spl/command/parse

function spl_command_parse (input) { 

    input.value.comment = "The new spl/command/parse";
    input.headers.spl.request.status = "new-request";
    input.value = {
        headers: { spl: { request: { action: "spl/console/log", status: "pending" } } },
        value: input.value
      }
    return input 
}
exports.default = spl_command_parse;
