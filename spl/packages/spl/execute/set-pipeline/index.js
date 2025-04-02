// spl/execute/set-pipeline
// set new pipeline (header -> header)

function spl_execute_set_pipeline ( input ) {
    const execute = input.headers.spl.execute;
    const request = input.headers.spl.request;
    execute.action = "spl/execute/set-next";
    execute.status = "pending";
    execute.pipeline = request.pipeline;
    request.status = "completed";
    return input;
}
exports.default = spl_execute_set_pipeline;