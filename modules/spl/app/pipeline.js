//  name        Pipeline
//  URI         spl/app/pipeline
//  type        API Method
//  description Creates pipelines from the parsed commands
//              API internal command
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const app = require("./app.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_pipeline (input)
{ 
    // current implementation executes the batch within the same execution record - no spawning
    const splApp = spl.wsRef ( input, "spl/app" );
    app.reset ( splApp );
    var TTL = 10
    splApp.pipeline = [];
    splApp.global = { help: [] };
    while ( TTL-- > 0 ) 
    {
        // get next line, if line = -1 then no next and break - it is finished
        const current = app.getNext ( splApp ); if ( current.line < 0 ) break;
        const parsed = app.parsed ( splApp, current );
        for ( var key in parsed )
        {
            // first process global arguments
            // current implementation sets the global argument for the whole batch
            if ( key === "" ) 
            {
                if ( !(parsed[key].test === undefined ) ) splApp.global.parseOnly = true;
                if ( parsed[key].steps > 0 ) splApp.global.steps = parsed[key].steps;
                if ( parsed[key].help ) splApp.global.help.push ( key );
                if ( parsed[key].debug ) splApp.global.consoleMode = "debug";
                else if ( parsed[key].verbose ) splApp.global.consoleMode = "verbose";
            }
            else
            {
                if ( parsed[key]._unknown != undefined ) delete parsed[key]._unknown;
                if ( parsed[key].help ) { splApp.global.help.push ( key ); delete parsed[key].help; };
                const request = { action: key };
                for ( var k in parsed[key] ) { request[key] = parsed[key]; break; };
                splApp.pipeline.push ( request );
            }
            
            // next create the pipelines
            // the current implementation puts all commands in one single pipeline
        }
        app.setCurrent ( splApp, current );
    }
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
