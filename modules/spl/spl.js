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

// gets a deep clone of a keyvalue in input
function rcGet (reference, key)
{ 
    const keys = key.split(".");
    for(i=0; i<keys.length; i++)
    {
        if(reference[keys[i]]==undefined) return undefined;
        reference = reference[keys[i]];
    }
    return structuredClone(reference);
}
exports.rcGet = rcGet;

// gets a reference to a keyvalue in input
function rcRef (reference, key)
{ 
    const keys = key.split(".");
    for(i=0; i<keys.length; i++)
    {
        if(reference[keys[i]]==undefined) return undefined;
        reference = reference[keys[i]];
    }
    return reference;
}
exports.rcRef = rcRef;

// Sets a value of a keyvalue in input
function rcSet (reference, key, value)
{ 
    const keys = key.split(".");
    for(i=0; i<keys.length; i++)
    {
        if ( i == keys.length - 1 ) reference[keys[i]] = value;
        else if( reference[keys[i]] === undefined ) reference[keys[i]] = {};
        reference = reference[keys[i]];
    } 
}
exports.rcSet = rcSet;

// wbGet returns a deep clone of a keyvalue in input.value.
exports.wsGet = function (record, key)
{ 
    return rcRef(record.value, key);
}

// wbGet returns a reference to a keyvalue in input.value.
exports.wsRef = function (record, key)
{ 
    return rcRef(record.value, key);
}

// wbSet property sets a key in input.value but archives the existing keyvalue in an array.
exports.wsSet = function (record, key, value)
{ 
    const current = rcRef(record.value, key);
    if( !( current === undefined ) ) {
        var archive = rcRef(record.value, `${key}/archive`);
        if ( archive === undefined ) { 
            rcSet( record.value, `${key}/archive`, [] ); 
            archive = rcRef(record.value, `${key}/archive`); 
        }
        archive.push(current);
    }
    rcSet(record.value, key, value);
}
