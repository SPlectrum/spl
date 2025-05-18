//  name        Pipeline
//  URI         spl/app/finalise
//  type        API Method
//  description Prepares execution of batch based on global settings
//              API internal command
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const app = require("./app.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_finalise (input)
{ 
    // current implementation executes the batch within the same execution record - no spawning
    const splApp = spl.wsRef ( input, "spl/app" );
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
