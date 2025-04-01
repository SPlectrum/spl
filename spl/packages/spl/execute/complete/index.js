// spl/execute/complete
// finalises execution of a request

function spl_execute_complete ( input ) {
        input.headers.spl.execute.action = "";
        input.headers.spl.execute.status = "completed";
        input.value = null;
        return input;
    }

exports.default = spl_execute_complete;
