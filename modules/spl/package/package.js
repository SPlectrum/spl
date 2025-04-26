//  name        package Auxiliary Functions
//  URI         package/package
//  type        Auxiliary Library
//  description Contains the common functions for the package API.
//              These are very similar to the filesystem data library.
///////////////////////////////////////////////////////////////////////////////
const path = require('path');
const fs = require('fs');
///////////////////////////////////////////////////////////////////////////////

// adds a full folder path 
exports.addFolder = function (folderPath) {
    console.log(`Adding folder: ${folderPath}`);
    fs.mkdirSync(folderPath, { recursive: true });
}

// returns an array of files and folders - synchronous
exports.folderContents = function (folderPath) {
    return fs.readdirSync(folderPath);    
}

// gets the contents of a file from the filesystem - synchronous
exports.getFile = function (filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

// Checks if the folder item is a file or folder - synchronous
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

// removes a full folder path with file contents
exports.removeFolder = function (folderPath) {
    console.log(`Removing folder: ${folderPath}`);
    fs.rmSync(folderPath, { recursive: true, force: true });
}
///////////////////////////////////////////////////////////////////////////////
