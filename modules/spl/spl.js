//  name        SPL Package Useful Functions
//  URI         spl/spl
//  type        Auxiliary Library
//  description Library of auxiliary methods at package level
//              It contains methods to invoke actions, set properties and
//              interacts with the workspace.
///////////////////////////////////////////////////////////////////////////////
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

// Get input arguments
exports.args = function ( input, arg ) {
    var parts = [];
    if ( input.headers.spl.execute.action === "spl/execute/next" ) parts = input.headers.spl.request.action.split ( "/" );
    else parts = input.headers.spl.execute.action.split ( "/" );
    if ( arg === undefined ) return input.headers[parts[0]][parts[1]][parts[2]];
    else return input.headers[parts[0]][parts[1]][parts[2]][arg];
}

// Complete request
exports.completed = function ( input ) {
    var parts = [];
    if ( input.headers.spl.execute.action === "spl/execute/next" ) {
        parts = input.headers.spl.request.action.split ( "/" );
        input.headers.spl.request.status = "completed";
    } else {
        parts = input.headers.spl.execute.action.split ( "/" );
        input.headers.spl.execute.action = "spl/execute/set-next";
    }
    delete input.headers.spl[parts[1]][parts[2]];
}

// random UUID generation
function generateUUID() { return randomUUID(); }
exports.generateUUID = generateUUID;

// easy functions to invoke actions
exports.moduleAction = function (input, module)
{
    const cwd = input.headers.spl.execute.cwd;
    const moduleRoot = (input.headers.spl.execute.modules===undefined) ? "modules" : input.headers.spl.execute.modules;
    return require(`${cwd}/${moduleRoot}/${module}`).default(input);
}

// construct a forward slash path for platform internal use
exports.URI = function ( ...args ) { 
    var result = []; for(var i=0; i<args.length; i++) if(args[i] != "") result.push(args[i]);;
    return result.join ( "/" );
}

// construct a forward slash path for platform internal use
exports.fURI = function ( ... args ) { 
    args[args.length-1] = args[args.length-1].replaceAll ( ".", "_" );
    var result = []; for(var i=0; i<args.length; i++) if(args[i] != "") result.push(args[i]);;
    return result.join ( "/" );
}

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
    for(i=0; i<keys.length-1; i++) {
        if( reference[keys[i]] === undefined ) reference[keys[i]] = {};
        reference = reference[keys[i]];
    } 
    reference[keys[i]] = value;
//        if ( i == keys.length - 1 ) reference[keys[i]] = value;
//        else if( reference[keys[i]] === undefined ) reference[keys[i]] = {};
//        reference = reference[keys[i]];
//    } 
}
exports.rcSet = rcSet;

// wbGet returns a deep clone of a keyvalue in input.value.
exports.wsGet = function (record, key)
{ 
    return rcGet(record.value, key);
}

// wsCheckIfExists checks the presence of a property and loads it when not
exports.wsExists = function ( input, key, action, args, repeat ) {
    const parts = action.split ( "/" );
    if( input.value[key] === undefined ) {
        input.headers[parts[0]][parts[1]][parts[2]] = [ args ];
        input.headers.spl.request[`${parts[1]}_next`] = action;
        input.headers.spl.request.status = parts[1];
        input.headers.spl.request.repeat = repeat;
        return false;
    }
    return true;
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
