// spl/lib.js
// A library of useful functions

function moduleAction (input, module)
{
    cwd = input.headers.spl.execute.cwd;
    return require(`${cwd}/modules/${module}`).default(input);
}
exports.moduleAction = moduleAction;
exports.commandAction = function (input) { return moduleAction(input, input.headers.spl.command.action); }
exports.executeAction = function (input) { return moduleAction(input, input.headers.spl.execute.action); }
exports.requestAction = function (input) { return moduleAction(input, input.headers.spl.request.action); }

exports.setProperty = function (reference, key, value)
{ 
    const keys = key.split(".");
    for(i=0; i<keys.length; i++)
    {
        if(reference[keys[i]]==undefined) { reference[keys[i]] = (i==keys.length-1) ? value : {}; }
        reference = reference[keys[i]];
    } 
}
