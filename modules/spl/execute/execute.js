//  name        Execute a pipeline segment
//  URI         spl/execute/execute
//  type        API Method
//  description Manages the execution flow of a pipeline segment.
//              It starts with an initialise action and finishes with a complete action.
//              Output of bot actions is logged. 
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_execute ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    var session = input.headers.spl.execute.session;
    if ( session !== "boot" && session !== "system" ) session = `sessions/${session}`;
    const requestsFolder = `${cwd}/runtime/${session}/requests`;

    function executeRequest() {

        var execAction = input.headers.spl.execute.action;
        input = spl.executeAction(input);
        input.headers.spl.execute.history.push(`${execAction} ${input.headers.spl.request.action}`);

        // Update TTL -- NEEDS A SEPARATE ERROR SECTION IN THE WORKSPACE
        if ( --input.headers.spl.execute.TTL < 1 && execAction != "spl/execute/complete" ) spl.addErrorInfo(input, "TTL has expired, execution aborted.");

        if ( execAction === "spl/execute/initialise" || execAction === "spl/execute/complete" ) {

            var folder = execAction.substring(execAction.lastIndexOf("/")+1);
            if ( folder === "initialise" ) {

                const writeFile = {};
                writeFile[`runtime/${session}/requests/initialise`] = structuredClone(input);
                const writeRecord = {
                    headers: { 
                        spl: { 
                            data: { write: [ { repo: `runtime/${session}`, folder: `requests/initialise` } ], history: [] },
                            execute: structuredClone(input.headers.spl.execute),
                            request: {}
                        } 
                    },
                    value: { "spl/data": writeFile }
                }
                const writeOutput = spl.moduleAction( writeRecord, "spl/data/write" );
                input.headers.spl.execute.fileName = writeOutput.value["spl/data"][`runtime/${session}/requests/initialise`].headers.data.location.file;
            }
            else {
                const putFile = {};
                putFile[`runtime/${session}/requests/complete/${input.headers.spl.execute.fileName.replace(".","_")}`] = structuredClone(input);
                const putRecord = {
                    headers: { 
                        spl: { 
                            data: { put: [ { repo: `runtime/${session}`, folder: `requests/complete`, file: input.headers.spl.execute.fileName } ], history: [] },
                            execute: structuredClone(input.headers.spl.execute),
                            request: {}
                        } 
                    },
                    value: { "spl/data": putFile }
                }
                spl.moduleAction( putRecord, "spl/data/put" );
            }
        }

        if ( spl.hasError(input) ) input.headers.spl.execute.action = "spl/execute/complete";

        if ( execAction != "spl/execute/complete" ) executeRequest();
    }
    executeRequest();

    return input;
}
///////////////////////////////////////////////////////////////////////////////
