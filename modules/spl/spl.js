//  name        SPL Package Useful Functions
//  URI         spl/spl
//  type        Auxiliary Library
//  description Library of auxiliary methods at package level
//              It contains methods to invoke actions, set properties and
//              interacts with the workspace.
///////////////////////////////////////////////////////////////////////////////
const { randomUUID } = require('crypto');

// Get method specific pipeline configuration ( input, etc. )
function spl_config ( input, key ) {
    // split the current action ( request or execute )
    var parts = [], result, entry;
    if ( spl_context ( input, "action" ) === "spl/execute/next" ) parts = input.headers.spl.request.action.split ( "/" );
    else parts = spl_context ( input, "action" ).split ( "/" );
    const apiRef = `${parts[0]}.${parts[1]}`;
    const methodRef = `${parts[0]}.${parts[1]}.${parts[2]}`;

    // first: check execution header for method config
    if ( key === undefined ) result = spl_rcRef ( input.headers, methodRef );
    else result = spl_rcRef ( input.headers, `${methodRef}.${key}` );
    if ( !( result === undefined ) ) return result;

    // second: check workspace method entry header for method config
    entry = wsRef ( input, methodRef );
    if ( entry && entry.headers && spl_rcRef ( entry.headers, methodRef ) ) {
        if ( key === undefined ) result = entry.headers[parts[0]][parts[1]][parts[2]];
        else result = entry.headers[parts[0]][parts[1]][parts[2]][key];
    }
    if ( !( result === undefined ) ) return result;

    // third: check workspace API entry header  for method config
    entry = wsRef ( input, `${parts[0]}/${parts[1]}` );
    if ( entry && entry.headers && entry.headers[parts[0]] && entry.headers[parts[0]][parts[1]] && entry.headers[parts[0]][parts[1]][parts[2]] ) {
        if ( key === undefined ) result = entry.headers[parts[0]][parts[1]][parts[2]];
        else result = entry.headers[parts[0]][parts[1]][parts[2]][key];
    }
    if ( !( result === undefined ) ) return result;
    
    if ( key === undefined ) return result; // no default
    // fourth: check execution header for API config (default)
    result = input.headers[parts[0]][parts[1]][key];
    if ( !( result === undefined ) ) return result;
    
    // fifth: check workspace API entry header for API config (default)
    if ( entry && entry.headers && entry.headers[parts[0]] && entry.headers[parts[0]][parts[1]] )
        result = entry.headers[parts[0]][parts[1]][key];
    return result;
}
exports.config = spl_config;

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
    if ( input.headers[parts[0]] && input.headers[parts[0]][parts[1]] ) delete input.headers.spl[parts[1]][parts[2]];
}

// get execution context properties
function spl_context ( input, key ) {
    if ( key === undefined ) return input.headers.spl.execute;
    return input.headers.spl.execute[key];
}
exports.context = spl_context;

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
    var message = `${input.headers.spl.request.action} - ${input.headers.spl.execute.action}`;
    if ( activity != "" ) message += ` --> ${activity}`;
    input.headers.spl.execute.history.push ( message );
    var consoleProgress = spl_context ( input, "consoleProgress" );
    if ( consoleProgress && consoleProgress != input.headers.spl.request.action ) {
        consoleProgress = input.headers.spl.request.action;
        console.log ( ` > ${consoleProgress}` );
        spl_setContext ( input, "consoleProgress", consoleProgress );
    }
    if ( activity.substring ( 0, 5 ) == "ERROR" ) console.error ( message );
    else if ( spl_context ( input, "consoleMode" ) != "silent" && activity.substring ( 0, 7 ) == "WARNING" ) console.error ( message );
}

// easy functions to invoke actions
exports.moduleAction = function (input, module)
{
    const cwd = input.headers.spl.execute.cwd;
    const moduleRoot = (input.headers.spl.execute.modules===undefined) ? "modules" : input.headers.spl.execute.modules;
    return require(`${cwd}/${moduleRoot}/${module}`).default(input);
}

// gets a deep clone of a keyvalue in input
function spl_rcGet (reference, key)
{ 
    const keys = key.split(".");
    for(i=0; i<keys.length; i++)
    {
        if(reference[keys[i]]==undefined) return undefined;
        reference = reference[keys[i]];
    }
    return structuredClone(reference);
}
exports.rcGet = spl_rcGet;

// gets a reference to a keyvalue in input
function spl_rcRef (reference, key)
{ 
    const keys = key.split(".");
    for(i=0; i<keys.length; i++)
    {
        if(reference[keys[i]]==undefined) return undefined;
        reference = reference[keys[i]];
    }
    return reference;
}
exports.rcRef = spl_rcRef;

// Sets a value of a keyvalue in input
function spl_rcSet (reference, key, value)
{ 
    const keys = key.split(".");
    for(i=0; i<keys.length-1; i++) {
        if( reference[keys[i]] === undefined ) reference[keys[i]] = {};
        reference = reference[keys[i]];
    } 
    reference[keys[i]] = value;
}
exports.rcSet = spl_rcSet;

// get request context properties
exports.request = function ( input, key ) {
    if ( key === undefined ) return input.headers.spl.request;
    return input.headers.spl.request[key];
}

// Get method specific pipeline configuration ( input, etc. )
function spl_setConfig ( input, action, key, value ) {
    action = action.replaceAll ( "/", "." );
    if ( key === undefined ) spl_rcSet ( input.headers, action, value );
    else  spl_rcSet ( input.headers, `${action}.${key}`, value );
}
exports.setConfig = spl_setConfig;

// get execution context properties
function spl_setContext ( input, key, value ) {
    input.headers.spl.execute[key] = value;
}
exports.setContext = spl_setContext;

// get request context properties
exports.setRequest = function ( input, key, value ) {
    if ( key === null ) input.headers.spl.request = value;
    else input.headers.spl.request[key] = value;
}

// Complete request
exports.throwError = function ( input, message ) {
    if ( spl_context ( input, "action" ) === "spl/execute/next" ) {
        spl_setConfig ( input, "status", "error");
        input.headers.spl.request.error_next = "spl/error/catch";
    } else {
        input.headers.spl.execute.action = "spl/error/catch";
    }
    spl_setConfig ( input, "spl/error/catch", "message", message );
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
        if( Array.isArray ( args ) ) spl_rcSet ( input.headers, `${[parts[0]]}.${[parts[1]]}.${[parts[2]]}`, args ); //input.headers[parts[0]][parts[1]][parts[2]] = args;
        else spl_rcSet ( input.headers, `${[parts[0]]}.${[parts[1]]}.${[parts[2]]}`, [ args ] ); //input.headers[parts[0]][parts[1]][parts[2]] = [ args ];
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
