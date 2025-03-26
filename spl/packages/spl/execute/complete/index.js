// spl/execute/complete
// finalises execution of a request

function spl_execute_complete ( input ) {
        input.headers.action = "";
        input.headers.status = "completed";
        input.value = null;
        return input;
    }

exports.default = spl_execute_complete;
