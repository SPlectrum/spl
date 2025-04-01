// spl/execute/set-pipeline
// set new pipeline (header -> header)

function spl_execute_set_pipeline ( input ) {
    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.execute.status = "pending";
    input.headers.spl.execute.pipeline = input.value.headers.pipeline;
    input.value.headers.spl.execute.status = "completed";
    return input;
}

exports.default = spl_execute_set_pipeline;