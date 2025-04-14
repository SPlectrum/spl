// spl/execute/set-pipeline
// set new pipeline (header -> header)

exports.default = function spl_execute_set_pipeline ( input ) {
    const execute = input.headers.spl.execute;
    const request = input.headers.spl.request;

    execute.action = "spl/execute/set-next";
    execute.status = "pending";
    execute.pipeline = (execute.pipeline == undefined) ? request.pipeline : request.pipeline.concat(execute.pipeline);
    request.status = "completed";
    return input;
}
