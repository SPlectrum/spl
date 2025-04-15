// spl/package/package.js
// A library of useful functions
const path = require('path');
const fs = require('fs');

// spl/package has its own fs implementation independent of spl/data

// adds a full folder path 
exports.addFolder = function (folderPath) {
    console.log(`Adding folder: ${folderPath}`);
    fs.mkdirSync(folderPath, { recursive: true });
}

// delete file asynchronously, in the background - asynchronous
exports.deleteFile = function (filePath) {
    fs.unlink(filePath,(err) => { 
        if (err) console.log(`error while attempting to delete ${filePath}: ${err}`); 
        else console.log(`deleted file ${filePath}`); });
}

// returns an array of files and folders - synchronous
// on Splectrum files have file extensions (i.e. dot in name), folders have not
exports.folderContents = function (folderPath) {
    return fs.readdirSync(folderPath);    
}

// gets the contents of a file from the filesystem - synchronous
exports.getFile = function (filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

// Checks if the folder item is a file or folder - synchronous
exports.isFile = function (filePath) { return fs.lstatSync(filePath).isFile(); }

// move file asynchronously, in the backgroud - asynchronous
exports.moveFile = function (fromFilePath, toFilePath) {
    fs.rename(fromFilePath, toFilePath, function (err) {
        if (err) console.log(`error while attempting to move ${fromFilePath}: ${err}`); 
        else console.log(`moved file from ${fromFilePath}\n           to ${toFilePath}`); });
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
    fs.rmSync(dir, { recursive: true, force: true }, folderPath);
}
