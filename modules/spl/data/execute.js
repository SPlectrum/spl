// spl/data/execute
// executes a command
const spl = require("../spl.js")
const data = require("./data.js")

const fs = require("fs");

exports.default = function spl_data_execute ( input ) {

    const splExecute = input.headers.spl.execute;
    const cwd = splExecute.cwd;
    var session = splExecute.session;
    if ( session !== "boot" && session !== "system" ) session = `sessions/${session}`;
    const requestsFolder = `${cwd}/runtime/${session}/requests`;

    // CREATE FUNCTION FOR EXECUTION LOOP
    function executeRequest() {

        var execAction = splExecute.action;
        input = spl.executeAction(input);
        input.headers.spl.execute.history.push(`${execAction} ${input.headers.spl.request.action}`);

        // Update TTL -- NEEDS A SEPARATE ERROR SECTION IN THE WORKSPACE
        if ( --splExecute.TTL < 1 && execAction != "spl/execute/complete" ) spl.addErrorInfo(input, "TTL has expired, execution aborted.");

        if ( execAction === "spl/execute/initialise" || execAction === "spl/execute/complete" ) {

            var folder = execAction.substring(execAction.lastIndexOf("/")+1);
            if ( folder === "initialise" ) splExecute.fileName = data.writeFileRecord(`${requestsFolder}/${folder}`, JSON.stringify(input,null,2));
            else data.putFile(`${requestsFolder}/${folder}/${splExecute.fileName}`, JSON.stringify(input,null,2));
        }

        if ( spl.hasError(input) ) splExecute.action = "spl/execute/complete";

        if ( execAction != "spl/execute/complete" ) executeRequest();
    }
    executeRequest();

    return input;
}

/*
'use strict';

var spawn = require('child_process').spawn;

console.log("Node says hello. Let's see what ping has to say...");

var child = spawn(
  'ping'
, [ '-c', '3', 'google.com' ]
, { detached: true, stdio: 'inherit' }
);

child.unref();
*/