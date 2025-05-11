//  name        spawn
//  URI         spl/execute/spawn
//  type        API Method
//  description Spawns a child request with a new pipeline.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = async function spl_execute_spawn ( input )
{
    spawnInput = { headers: { spl: { execute: {}, request: { action: "spl/execute/spawn" } } }, value: {} }
    const execute = {
        action: "spl/execute/initialise", 
        history: [], 
        consoleProgress: "start",
        consoleMode: "standard", // silent, warning, verbose, debug 
        cwd: spl.context ( input, "cwd" ), 
        session: spl.context ( input, "session" ),  
        modules: spl.context ( input, "modules" ),
        pipeline:  structuredClone ( spl.rcRef ( spl.wsRef ( input, "spl/execute.set-pipeline" ), "headers.spl.execute.pipeline" ) )
    }; 
    spl.rcSet ( spawnInput, "headers.spl.execute", execute );
//        console.dir(spawnInput,{depth:100});
    setImmediate ( () => spl.moduleAction ( spawnInput, "spl/execute/execute" ) );
    spl.setContext ( input, "action", "spl/execute/set-next" );
}
///////////////////////////////////////////////////////////////////////////////
