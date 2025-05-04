//  name        Set Pipeline
//  URI         spl/execute/set-pipeline
//  type        API Method
//  description Adds a new pipeline to the existing one.
//              This offers a flexible mechanism to set the execution plan 
//              of an action at runtime. 
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_set_pipeline ( input ) {
    const splExecute = input.headers.spl.execute;
    const newPipeline = structuredClone(spl.wsGet(input, "spl/execute/set-pipeline.value"));
    splExecute.pipeline = (splExecute.pipeline == undefined) ? newPipeline : newPipeline.concat(splExecute.pipeline);
    splExecute.action = "spl/execute/set-next";
}
///////////////////////////////////////////////////////////////////////////////
