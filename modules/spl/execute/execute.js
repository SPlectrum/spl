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

    var session = input.headers.spl.execute.session;
    if ( session !== "boot" && session !== "system" ) session = `sessions/${session}`;

    function executeRequest() {

        var execAction = ( input.headers.spl.execute.action === undefined ) ? "spl/execute/initialise" : input.headers.spl.execute.action ;
        input = spl.moduleAction ( input, execAction );
        input.headers.spl.execute.history.push ( `${execAction} ${input.headers.spl.request.action}` );

        // Update TTL -- NEEDS A SEPARATE ERROR SECTION IN THE WORKSPACE
        if ( --input.headers.spl.execute.TTL < 1 && execAction != "spl/execute/complete" ) spl.addErrorInfo ( input, "TTL has expired, execution aborted." );

        if ( execAction === "spl/execute/initialise" || execAction === "spl/execute/complete" ) {

            var dir = execAction.substring(execAction.lastIndexOf("/")+1);
            if ( dir === "initialise" ) {

                const filePath = spl.URI ( "runtime", session, "requests/initialise" );
                const writeFile = {};
                writeFile[ filePath ] = structuredClone(input);
                const writeRecord = {
                    headers: { 
                        spl: { 
                            data: { write: [ { repo: spl.URI ( "runtime", session ), dir: "requests/initialise" } ], history: [] },
                            execute: structuredClone(input.headers.spl.execute),
                            request: {}
                        } 
                    },
                    value: { "spl/data": writeFile }
                }
                const writeOutput = spl.moduleAction( writeRecord, "spl/data/write" );
                input.headers.spl.execute.fileName = writeOutput.value["spl/data"][filePath].headers.spl.data.file;
            }
            else {
                const putFile = {};
                putFile[ spl.fURI ( "runtime", session, "requests/complete", input.headers.spl.execute.fileName ) ] = structuredClone ( input );
                const putRecord = {
                    headers: { 
                        spl: { 
                            blob: { put: [ { repo: spl.URI ( "runtime", session ), dir: "requests/complete", file: input.headers.spl.execute.fileName } ], history: [] },
                            execute: structuredClone(input.headers.spl.execute),
                            request: {}
                        } 
                    },
                    value: { "spl/blob": putFile }
                }
                spl.moduleAction( putRecord, "spl/blob/put" );
            }
        }

        if ( spl.hasError(input) ) input.headers.spl.execute.action = "spl/execute/complete";

        if ( execAction != "spl/execute/complete" ) executeRequest();
    }
    executeRequest();

    return input;
}
///////////////////////////////////////////////////////////////////////////////
