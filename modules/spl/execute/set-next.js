//  name        Set Next Request
//  URI         spl/execute/set-next
//  type        API Method
//  description Sets the next request action to execute from the execution pipeline.
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_set_next ( input ) {

    if(input.headers.spl.execute.repeat) {
        input.headers.spl.execute.repeat = false;
        input.headers.spl.execute.action = "spl/execute/next";
    }
    else if (!(input.headers.spl.execute.pipeline === undefined)  && input.headers.spl.execute.pipeline.length > 0) {
        input.headers.spl.request = input.headers.spl.execute.pipeline.shift();
        input.headers.spl.execute.action = "spl/execute/next";
    } 
    else input.headers.spl.execute.action = "spl/execute/complete";

    return input;
}
///////////////////////////////////////////////////////////////////////////////
