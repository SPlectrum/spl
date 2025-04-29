//  name        package Auxiliary Functions
//  URI         package/package
//  type        Auxiliary Library
//  description Contains the common functions for the package API.
//              These are very similar to the filesystem data library.
///////////////////////////////////////////////////////////////////////////////
const path = require('path');
const fs = require('fs');
///////////////////////////////////////////////////////////////////////////////

// adds a full dir path 
exports.addDir = function (dirPath) {
    console.log(`Adding dir: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
}

// returns an array of files and dirs - synchronous
exports.dirContents = function (dirPath) {
    return fs.readdirSync(dirPath);    
}

// gets the contents of a file from the filesystem - synchronous
exports.getFile = function (filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

// Checks if the dir item is a file or dir - synchronous
exports.isFile = function (filePath) { return fs.lstatSync(filePath).isFile(); }

// create a properly formatted file path
exports.path = function ( ...args ){
    return path.join(...args);
}

// put file asynchronously, in the background - asynchronous
exports.putFile = function (filePath, contents) {
    fs.writeFile(filePath, contents, (err) => {
        if (err) console.log(`error while attempting to put ${filePath}: ${err}`); 
        else console.log(`put file ${filePath}`); });
}

// removes a full dir path with file contents
exports.removeDir = function (dirPath) {
    console.log(`Removing dir: ${dirPath}`);
    fs.rmSync(dirPath, { recursive: true, force: true });
}
///////////////////////////////////////////////////////////////////////////////
