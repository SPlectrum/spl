// spl/spl.js
// A library of useful functions
const { randomUUID } = require('crypto');

// gather error information
exports.addErrorInfo = function (input, info)
{
    if(input.headers.spl.error==undefined) input.headers.spl.error = info;
    else input.headers.spl.error = "\n" + info;
}

// random UUID generation
function generateUUID() { return randomUUID(); }
exports.generateUUID = generateUUID;

// easy functions to invoke actions
function moduleAction (input, module)
{
    cwd = input.headers.spl.execute.cwd;
    return require(`${cwd}/modules/${module}`).default(input);
}
exports.moduleAction = moduleAction;
exports.commandAction = function (input) { return moduleAction(input, input.headers.spl.command.action); }
exports.executeAction = function (input) { return moduleAction(input, input.headers.spl.execute.action); }
exports.requestAction = function (input) { return moduleAction(input, input.headers.spl.request.action); }

// set property where parent chain may not exist yet
exports.setProperty = function (reference, key, value)
{ 
    const keys = key.split(".");
    for(i=0; i<keys.length; i++)
    {
        if(reference[keys[i]]==undefined) { reference[keys[i]] = (i==keys.length-1) ? value : {}; }
        reference = reference[keys[i]];
    } 
}
