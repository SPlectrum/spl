// spl/command/parse

function spl_command_execute (input) { 

    input.headers.spl.request.pipeline = [ 
        { "action": "spl/request/write", "data": {"repo": "data", "folder": `clients/${input.value.session}/requests`} }, 
        { "action": "spl/command/parse" },
        { "action": "spl/request/write", "data": {"repo": "data", "folder": `clients/${input.value.session}/responses`} }, 
    ];
    input.headers.spl.request.status = "new-pipeline";
    return input 
}
exports.default = spl_command_execute;
