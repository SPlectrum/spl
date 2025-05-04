//  name        Executes the Initialise Action
//  URI         spl/execute/initialise
//  type        API Method
//  description Initialises the execution of a pipeline segemnt.
//              The output of this action is logged.
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_initialise ( input ) {
    const spl = input.headers.spl;
    spl.execute.pipeline = [ spl.request ];
    spl.execute.startTime = Date.now();
    if( spl.execute.TTL === undefined ) spl.execute.TTL = 100;
    spl.execute.history = [];
    spl.data = { history: [] };
    spl.blob = { history: [] };
    spl.execute.action = "spl/execute/set-next";
}
///////////////////////////////////////////////////////////////////////////////
