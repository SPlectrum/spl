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

// adds a full folder path 
exports.addFolder = function (folderPath) {
    console.log(`Adding folder: ${folderPath}`);
    fs.mkdirSync(folderPath, { recursive: true });
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
exports.getFile = function (filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

// move file asynchronously, in the backgroud - asynchronous
exports.moveFile = function (fromFilePath, toFilePath) {
    fs.rename(fromFilePath, toFilePath, function (err) {
        if (err) console.log(`error while attempting to move ${fromFilePath}: ${err}`); 
        else console.log(`moved file from ${fromFilePath}\n           to ${toFilePath}`); });
}

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
