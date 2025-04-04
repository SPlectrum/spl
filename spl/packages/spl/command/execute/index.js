// spl/command/parse

function spl_command_execute (input) { 

//    input.headers.spl.request.pipeline = [ { "action": "spl/request/write", "data": {"repo": "data", "folder": "clients/boot"} }, { "action": "spl/console/log" } ];
    input.headers.spl.request.pipeline = [ { "action": "spl/command/parse" } ];
    input.headers.spl.request.status = "new-pipeline";
    return input 
}
exports.default = spl_command_execute;
