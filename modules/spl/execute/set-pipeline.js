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
    const newPipeline = structuredClone(spl.wsGet(input, "spl/execute/set-pipeline.value"));
    spl.setContext ( input, "pipeline", newPipeline.concat ( spl.context ( input, "pipeline" ) ) );
    spl.setContext ( input, "action", "spl/execute/set-next" );
}
///////////////////////////////////////////////////////////////////////////////
