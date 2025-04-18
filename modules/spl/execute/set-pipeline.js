// spl/execute/set-pipeline
// set new pipeline (header -> header)
const spl = require("../spl")

exports.default = function spl_execute_set_pipeline ( input ) {

    const execute = input.headers.spl.execute;
    const request = input.headers.spl.request;
    const newPipeline = spl.wsGet(input, "spl/execute/set-pipeline.input");

    execute.pipeline = (execute.pipeline == undefined) ? newPipeline : newPipeline.concat(execute.pipeline);

    execute.action = "spl/execute/set-next";
    execute.status = "pending";
    request.status = "completed";
    return input;
}
