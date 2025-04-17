// spl/command/parse

exports.default = function spl_command_execute (input) { 

    const session = input.headers.spl.execute.session;
    input.headers.spl.request.pipeline = [ 
        { action: "spl/command/write", destination: "requests" }, 
        { action: "spl/request/read", data: { read: [ { repo: "data", folder: `clients/${session}` } ] } }, 
        { action: "spl/command/parse", parseOptions: `data/clients/${session}` },
        { action: "spl/command/write", destination: "responses" }, 
    ];
    input.headers.spl.request.execute_next = "spl/execute/set-pipeline";
    input.headers.spl.request.status = "execute";
    return input 
}
