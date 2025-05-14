//  name        Prepare
//  URI         spl/app/prepare
//  type        API Method
//  description This action prepares the command line entry for parsing.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_prepare (input) { 

    // prepare the batch input for parsing
    // split into lines and where needed line parts
    const batchInput = spl.action ( input, "batch" ).split("\n");
    const batchPrepared = {};
    for ( var i = 0; i < batchInput.length; i++ ) 
    {
        var batchLine = {};
        if ( batchInput[i].indexOf ( "_!_" ) > 0 ) 
        {
            batchInput[i] = batchInput[i].split ( "_!_" );
            for( var j = 0; j < batchInput[i].length; j++) batchLine[`part_${j}`] = batchInput[i][j];
        }
        else batchLine = batchInput[i];

        batchPrepared[`line_${i}`] = batchLine;
    }

    // create the workspace spl/app entry
    const prepared = { 
        headers: { spl: { app: { currentLine: 0, currentPart: 0, startPrefix: spl.action ( input, "startPrefix" ), actionFolder: spl.action ( input, "actionFolder" ) } } }, 
        value: { input: batchPrepared, parsed: [], options: {} } };
    spl.wsSet ( input, "spl/app", prepared );

    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
