// spl/execute/set-pipeline
// set new pipeline (header -> header)

function spl_execute_set_pipeline ( input ) {
    input.headers.action = "spl/execute/set-next";
    input.headers.status = "pending";
    input.headers.pipeline = input.value.headers.pipeline;
    input.value.headers.status = "completed";
    return input;
}

exports.default = spl_execute_set_pipeline;