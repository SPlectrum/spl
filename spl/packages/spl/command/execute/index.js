// spl/command/parse

function spl_command_execute (input) { 

    input.headers.spl.request.pipeline = [ 
        { "action": "spl/request/write", "data": input.headers.data }, 
        { "action": "spl/command/parse" },
        { "action": "spl/request/write", "data": {"repo": "data", "folder": `clients/${input.value.session}/responses`} }, 
    ];
    input.headers.spl.request.status = "new-pipeline";
//    input.headers.spl.request.status = "completed";
    return input 
}
exports.default = spl_command_execute;
