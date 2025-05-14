//  name        Parse
//  URI         spl/app/parse
//  type        API Method
//  description This action runs a JS script
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_parse (input) { 

    // test retrieving lookups
    const splApp = spl.wsRef ( input, "spl/app" )
    console.log ( splApp );

    var continueParsing = true, TTL = 10;
    while ( continueParsing & TTL-- > 0 ) {
    // parsing of commandline into a pipeline of actions
    console.log("parsing");

    }

    if( TTL < 1 ) return spl.throwError ( input, "Parser ran out of steps when parsing.")
    console.log("still continuing ...");
    
    //    spl.completed ( input );
/*
    // get folder contents of actions, batches and scripts folders
    const appRoot = spl.action ( input, "appRoot" );
    const actions = { repo: appRoot, dir: "actions", reference: [ "spl/app.actions" ] };
    const batches = { repo: appRoot, dir: "batches", reference: [ "spl/app.batches" ] };
    const scripts = { repo: appRoot, dir: "scripts", reference: [ "spl/app.scripts" ] };
    const args = [ actions, batches, scripts ];
    spl.gotoExecute ( input, "spl/blob/contents", args );
*/
}
///////////////////////////////////////////////////////////////////////////////
