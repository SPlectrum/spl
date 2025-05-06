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

    function executeRequest(input) {
        var session = spl.context ( input, "session" );
        if ( session !== "boot" && session !== "system" ) session = `sessions/${session}`;
        var execAction = ( spl.context( input, "action" ) === undefined ) ? "spl/execute/initialise" : spl.context ( input, "action" ) ;

        spl.moduleAction ( input, execAction );
        spl.history ( input, "completed" );
        // Update TTL -- NEEDS A SEPARATE ERROR SECTION IN THE WORKSPACE
        spl.setContext ( input, "TTL", spl.context ( input, "TTL") - 1 );
        if ( spl.context ( input, "TTL") < 1 && execAction != "spl/execute/complete" ) spl.addErrorInfo ( input, "TTL has expired, execution aborted." );

        if ( execAction === "spl/execute/initialise" || execAction === "spl/execute/complete" ) {

            var dir = execAction.substring(execAction.lastIndexOf("/")+1);
            if ( dir === "initialise" ) {

                const filePath = spl.URI ( "runtime", session, "requests/initialise" );
                const writeRecord = {
                    headers: { 
                        spl: { 
                            data: { write: [ { repo: spl.URI ( "runtime", session ), dir: "requests/initialise" } ], history: [] },
                            execute: structuredClone ( spl.context ( input ) ),
                            request: { action: "spl/data/write"}
                        } 
                    },
                    value: { "spl/data": { [ filePath ]: structuredClone ( input ) } }
                }
                spl.setContext ( writeRecord, "action", "spl/execute/next" );
                spl.moduleAction( writeRecord, "spl/data/write" );
                spl.setContext ( input, "fileName", writeRecord.value["spl/data"][filePath].headers.spl.data.file);
            }
            else {
                const putFile = {};
                putFile[ spl.fURI ( "runtime", session, "requests/complete", spl.context ( input, "fileName" ) ) ] = structuredClone ( input );
                const putRecord = {
                    headers: { 
                        spl: { 
                            blob: { put: [ { repo: spl.URI ( "runtime", session ), dir: "requests/complete", file: spl.context ( input, "fileName" ) } ], history: [] },
                            execute: structuredClone(input.headers.spl.execute),
                            request: { action: "spl/blob/put"}
                        } 
                    },
                    value: { "spl/blob": putFile }
                }
                spl.setContext ( putRecord, "action", "spl/execute/next" );
                spl.moduleAction( putRecord, "spl/blob/put" );
            }
        }

        if ( spl.hasError(input) ) spl.setContext ( input, "action", "spl/execute/complete" );

        if ( execAction != "spl/execute/complete" ) setImmediate( () => executeRequest ( input ) );
    }

    setImmediate( () => executeRequest ( input ) );
}
///////////////////////////////////////////////////////////////////////////////
