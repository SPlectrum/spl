// spl/execute/set-pipeline
// set new pipeline (header -> header)
const spl = require("../spl")

exports.default = function spl_execute_set_pipeline ( input ) {

    const newPipeline = structuredClone(spl.wsGet(input, "spl/execute/set-pipeline.input"));
    input.headers.spl.execute.pipeline = 
        (input.headers.spl.execute.pipeline == undefined) ? newPipeline : newPipeline.concat(input.headers.spl.execute.pipeline);

    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.execute.status = "pending";
    input.headers.spl.request.status = "completed";
    return input;
}
