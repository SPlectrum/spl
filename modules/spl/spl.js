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

// get property where parent chain may not exist yet
 function getProperty (reference, key)
{ 
    const keys = key.split(".");
    for(i=0; i<keys.length; i++)
    {
        if(reference[keys[i]]==undefined) return undefined;
        reference = reference[keys[i]];
    }
    return reference;
}
exports.getProperty = getProperty;

// set property where parent chain may not exist yet
function setProperty (reference, key, value)
{ 
    const keys = key.split(".");
    for(i=0; i<keys.length; i++)
    {
        if ( i == keys.length - 1 ) reference[keys[i]] = value;
        else if( reference[keys[i]] === undefined ) reference[keys[i]] = {};
        reference = reference[keys[i]];
    } 
}
exports.setProperty = setProperty;

// wbGet property gets a key in input.value.
exports.wsGet = function (record, key)
{ 
    return getProperty(record.value, key);
}

// wbSet property sets a key in input.value but archives the existing keyvalue in an array.
exports.wsSet = function (record, key, value)
{ 
    const current = getProperty(record.value, key);
    if( !( current === undefined ) ) {
        var archive = getProperty(record.value, `${key}/archive`);
        if ( archive === undefined ) { 
            setProperty( record.value, `${key}/archive`, [] ); 
            archive = getProperty(record.value, `${key}/archive`); 
        }
        archive.push(current);
    }
    setProperty(record.value, key, value);
}
