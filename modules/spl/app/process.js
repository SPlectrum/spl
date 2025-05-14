//  name        Process
//  URI         spl/app/process
//  type        API Method
//  description This is the entry action to prepare, parse and execute the command line string.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_process (input)
{ 
    spl.setConfig ( input, "spl/app", "appRoot", spl.action ( input, "appRoot" ) );
    spl.wsSet(input, "spl/execute.set-pipeline", {
        headers: {
            spl: {
                execute: {
                    pipeline: [
                        { action: "spl/app/prepare", "spl/app/prepare": { 
                                                            batch: spl.action ( input, "batch" ), 
                                                            startPrefix: spl.action ( input, "startPrefix" ), 
                                                            actionFolder: spl.action ( input, "actionFolder" ) } },
                        { action: "spl/app/parse", "spl/app/parse": {  } }
                    ]
                }
            }
        }, 
        value: {}
    });
    spl.gotoExecute ( input, "spl/execute/set-pipeline" );
}
///////////////////////////////////////////////////////////////////////////////
