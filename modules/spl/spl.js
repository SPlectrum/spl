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
    if( input.value["spl/error"] === undefined ) input.value["spl/error"] = { headers: {}, value: [info] };
    else input.value["spl/error"].value.push(info);
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

    // input arguments from request execution header
    var result;
    if ( arg === undefined ) result = input.headers[parts[0]][parts[1]][parts[2]];
    else result = input.headers[parts[0]][parts[1]][parts[2]][arg];
    // if none in header then check API workspace method record header
    
    // if none in header then check API workspace record header
    
    // if none in API workspace header then check default in request execution header header
    
    // if no default in request execution header header then check default in API workspace record header
    
    return result;
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

// get execution context properties
exports.context = function ( input, key ) {
    if ( key === undefined ) return input.headers.spl.execute;
    return input.headers.spl.execute[key];
}

// construct a forward slash path with filename for platform internal use - dot converted to underscore
exports.fURI = function ( ... args ) { 
    args[args.length-1] = args[args.length-1].replaceAll ( ".", "_" );
    var result = []; for(var i=0; i<args.length; i++) if(args[i] != "") result.push(args[i]);;
    return result.join ( "/" );
}

// random UUID generation
function generateUUID() { return randomUUID(); }
exports.generateUUID = generateUUID;

// wsAction sets an action for the execution context
exports.gotoExecute = function ( input, action, args ) {
    var parts = action.split ( "/" );
    if ( args != undefined ) input.headers[parts[0]][parts[1]][parts[2]] = args;
    input.headers.spl.request[`${parts[1]}_next`] = action;
    input.headers.spl.request.status = parts[1];
    input.headers.spl.request.repeat = false;
    parts = input.headers.spl.request.action.split ( "/" );
    delete input.headers.spl[parts[1]][parts[2]];
}

// add to execution history
exports.history = function ( input, activity ) {
    const message = `${input.headers.spl.request.action} - ${input.headers.spl.execute.action} --> ${activity}`;
    input.headers.spl.execute.history.push ( message );
}

// easy functions to invoke actions
exports.moduleAction = function (input, module)
{
    const cwd = input.headers.spl.execute.cwd;
    const moduleRoot = (input.headers.spl.execute.modules===undefined) ? "modules" : input.headers.spl.execute.modules;
    return require(`${cwd}/${moduleRoot}/${module}`).default(input);
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
}
exports.rcSet = rcSet;

// get request context properties
exports.request = function ( input, key ) {
    if ( key === undefined ) return input.headers.spl.request;
    return input.headers.spl.request[key];
}

// get execution context properties
exports.setContext = function ( input, key, value ) {
    input.headers.spl.execute[key] = value;
}

// get request context properties
exports.setRequest = function ( input, key, value ) {
    if ( key === null ) input.headers.spl.request = value;
    input.headers.spl.request[key] = value;
}

// construct a forward slash path for platform internal use
exports.URI = function ( ...args ) { 
    var result = []; for(var i=0; i<args.length; i++) if(args[i] != "") result.push(args[i]);;
    return result.join ( "/" );
}

// wsExists checks the presence of a property and loads it when not
exports.wsExists = function ( input, key, action, args, repeat ) {
    const parts = action.split ( "/" );
    if( input.value[key] === undefined ) {
        if( Array.isArray ( args ) ) input.headers[parts[0]][parts[1]][parts[2]] = args;
        else input.headers[parts[0]][parts[1]][parts[2]] = [ args ];
        input.headers.spl.request[`${parts[1]}_next`] = action;
        input.headers.spl.request.status = parts[1];
        input.headers.spl.request.repeat = repeat;
        return false;
    }
    return true;
}

// wsGet returns a deep clone of a keyvalue in input.value.
exports.wsGet = function (record, key)
{ 
    const parts = key.split ( "." );
    if ( parts.length == 1  ) return structuredClone(record.value[parts[0]]);
    else return structuredClone(record.value[parts[0]].value[parts[1]]);
}

// wsGet returns a reference to a keyvalue in input.value.
function wsRef (record, key)
{ 
    const parts = key.split ( "." );
    if ( parts.length == 1  ) return record.value[parts[0]];
    else {
        if ( record.value[parts[0]] === undefined ) return undefined;
        else return record.value[parts[0]].value[parts[1]];
    }
}
exports.wsRef = wsRef;

// wsSet property sets a key in input.value but archives the existing keyvalue in an array.
exports.wsSet = function (record, key, value)
{ 
    const parts = key.split ( "." );
    const current = wsRef(record, key);
    if( !( current === undefined ) ) {
        var archive;
        if ( parts.length == 1 && record.value[`${parts[0]}/archive`] === undefined ) record.value[`${parts[0]}/archive`] = [];
        else if ( parts.length == 2 && record.value[parts[0]].value[`${parts[1]}/archive`] === undefined )
             record.value[parts[0]].value[`${parts[1]}/archive`] = [];
        archive = ( parts.length == 1 ) ? record.value[`${parts[0]}/archive`] : record.value[parts[0]].value[`${parts[1]}/archive`];
        archive.push(current);
    }
    if ( parts.length == 1  ) record.value[parts[0]] = value;
    else {
        if ( record.value[parts[0]] === undefined ) record.value[parts[0]] = { headers: {}, value: {} };
        record.value[parts[0]].value[parts[1]] = value;
    }
}
