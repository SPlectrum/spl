//  name        Prepare
//  URI         spl/app/prepare
//  type        API Method
//  description This action prepares the command line entry for parsing.
//              API internal command
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_prepare (input) { 

    // prepare the batch input for parsing
    // split into lines and where needed line parts
    var batchInput = spl.action ( input, "batch" );
    const batchPrepared = {};
    if ( Array.isArray ( batchInput ) ) batchPrepared["line_0"] = batchInput;
    else 
    {
        batchInput = batchInput.split("\n");
        for ( var i = 0; i < batchInput.length; i++ ) 
        {
            var batchLine = {};
            if ( batchInput[i].indexOf ( "_!_" ) > 0 ) 
            {
                batchInput[i] = batchInput[i].split ( "_!_" );
                for( var j = 0; j < batchInput[i].length; j++) 
                {
                    var result = batchInput[i][j].split(" ");
                    for ( var k = 0; k < result.length; k++ ) 
                    {
                        result[k] = result[k].replaceAll ( " ", "" );
                        if ( result[k] === "" ) delete result[k];
                    }
                    batchLine[`part_${j}`] = result;
                }
            }
            else
            {
                var result = batchInput[i].split(" ");
                for ( var k = 0; k < result.length; k++ ) 
                {
                    result[k] = result[k].replaceAll ( " ", "" );
                    if ( result[k] === "" ) delete result[k];
                }
                batchLine = result;
            }
            batchPrepared[`line_${i}`] = batchLine;
        }
    }

    // create the workspace spl/app entry
    const prepared = { 
        headers: { spl: { app: { currentLine: -1, currentPart: -1 } } }, 
        value: { batch: {}, input: batchPrepared, parsed: {}, options: {} } };
    spl.wsSet ( input, "spl/app", prepared );

    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
