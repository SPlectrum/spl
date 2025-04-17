// spl/spl.js
// A library of useful functions
const { randomUUID } = require('crypto');

// gather error information
exports.addErrorInfo = function (input, info)
{
    if( input.value["spl/error"] === undefined ) input.value["spl/error"] = [info];
    else input.value["spl/error"].push(info);
}
exports.hasError = function (input)
{
    return ( !( input.value["spl/error"] === undefined ) );
}

// random UUID generation
function generateUUID() { return randomUUID(); }
exports.generateUUID = generateUUID;

// easy functions to invoke actions
function moduleAction (input, module)
{
    const cwd = input.headers.spl.execute.cwd;
    const moduleRoot = (input.headers.spl.execute.modules===undefined) ? "modules" : input.headers.spl.execute.modules;
    return require(`${cwd}/${moduleRoot}/${module}`).default(input);
}
exports.moduleAction = moduleAction;
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
