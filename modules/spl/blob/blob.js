//  name        BLOB Auxiliary Functions
//  URI         spl/blob/blob
//  type        Auxiliary Library
//  description Contains common filesystem functions used by the blob API
//              There is a mixture of synchronous and asynchronous methods.
//              The initial implementation of the data layer is filesystem only.
///////////////////////////////////////////////////////////////////////////////
const path = require('path');
const fs = require('fs');
///////////////////////////////////////////////////////////////////////////////

// adds a full dir path 
exports.addDir = function (dirPath) {
    console.log(`Adding dir: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
}

// copy file from source to destination
exports.copyFile = function (fromFilePath, toFilePath) {
    fs.copyFile(fromFilePath, toFilePath, function (err) {
        if (err) console.log(`error while attempting to copy ${fromFilePath} to ${toFilePath}: ${err}`); 
        else console.log(`copied file from ${fromFilePath}\n            to ${toFilePath}`); });
}

// delete file asynchronously, in the background - asynchronous
exports.deleteFile = function (filePath) {
    fs.unlink(filePath,(err) => { 
        if (err) console.log(`error while attempting to delete ${filePath}: ${err}`); 
        else console.log(`deleted file ${filePath}`); });
}

// get file, synchronous
exports.getFile = function ( filePath ) { return fs.readFileSync ( filePath, 'utf8' ); }

// move file asynchronously, in the backgroud - asynchronous
exports.moveFile = function ( fromFilePath, toFilePath ) {
    fs.rename ( fromFilePath, toFilePath, function ( err ) {
        if ( err ) console.log ( `error while attempting to move ${fromFilePath}: ${err}` ); 
        else console.log ( `moved file from ${fromFilePath}\n           to ${toFilePath}` ); });
}

// create a properly formatted file path
exports.path = function ( ...args ) { return path.join ( ...args ); }

// put file asynchronously, in the background - asynchronous
exports.putFile = function ( filePath, contents ) {
    fs.writeFile ( filePath, contents, ( err ) => {
        if ( err ) console.log ( `error while attempting to put ${filePath}: ${err}` ); 
        else console.log ( `put file ${filePath}` ); });
}

// create a properly formatted file path
exports.setLocation = function ( location )
{
    if( Array.isArray(location) ) {
        const newLocation = {};
        newLocation.repo = location[0];
        newLocation.dir = location[1];
        newLocation.file = location[2];
        location = newLocation; 
    } else if ( typeof location === "string" ) {
        var uri = location.split("/");
        location = {};
        location.file = (uri[uri.length-1].indexOf(".")>0) ? uri.pop() : undefined;
        if ( ("clients data packages").includes(uri[0])) { location.repo = uri.slice(0,2).join("/"); location.dir = uri.slice(2).join("/"); }
        else if ( uri[2] === "data" ) { location.repo = uri.slice(0,3).join("/"); location.dir = uri.slice(3).join("/"); }
        else if ( uri[3] === "data" ) { location.repo = uri.slice(0,4).join("/"); location.dir = uri.slice(4).join("/"); }
    } else if( Array.isArray(location.path) ) {
        location.repo = location.path[0];
        location.dir = location.path[1];
        location.file = location.path[2]; 
    } else if ( typeof location.uri === "string" ) {
        var uri = location.uri.split("/");
        location.file = (uri[uri.length-1].indexOf(".")>0) ? uri.pop() : undefined;
        if ( ("clients data packages").includes(uri[0])) { location.repo = uri.slice(0,2).join("/"); location.dir = uri.slice(2).join("/"); }
        else if ( uri[2] === "data" ) { location.repo = uri.slice(0,3).join("/"); location.dir = uri.slice(3).join("/"); }
        else if ( uri[3] === "data" ) { location.repo = uri.slice(0,4).join("/"); location.dir = uri.slice(4).join("/"); }
    }
    return location;
}
