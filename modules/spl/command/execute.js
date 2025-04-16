// spl/command/parse

exports.default = function spl_command_execute (input) { 

    input.headers.spl.command.parsed = [];

    input.headers.spl.request.pipeline = [ 
        { action: "spl/request/write", data: { repo: "data", folder: `clients/${input.value.session}/requests` }}, 
        { action: "spl/request/read", data: { repo: "data", folder: `clients/${input.value.session}` }}, 
        { action: "spl/command/parse" },
        { action: "spl/request/write", data: { repo: "data", folder: `clients/${input.value.session}/responses`} }, 
    ];
    input.headers.spl.request.execute_next = "spl/execute/set-pipeline";
    input.headers.spl.request.status = "execute";
    return input 
}
