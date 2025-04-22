//  name        Data Auxiliary Functions
//  URI         spl/data/data
//  type        Auxiliary Library
//  description Contains common data functions used by the data API
//              There is a mixture of synchronous and asynchronous methods.
//              The initial implementation of the data layer is filesystem only.
///////////////////////////////////////////////////////////////////////////////
const path = require('path');
const fs = require('fs');
///////////////////////////////////////////////////////////////////////////////

exports.copyFile = function (fromFilePath, toFilePath) {
    fs.copyFile(fromFilePath, toFilePath, function (err) {
        if (err) console.log(`error while attempting to move ${fromFilePath}: ${err}`); 
        else console.log(`moved file from ${fromFilePath}\n           to ${toFilePath}`); });
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

// put file asynchronously, in the background - asynchronous
exports.putFile = function (filePath, contents) {
    fs.writeFile(filePath, contents, (err) => {
        if (err) console.log(`error while attempting to put ${filePath}: ${err}`); 
        else console.log(`put file ${filePath}`); });
}
// FILE AND FOLDER API - STANDARD FILE OPERATIONS - mixed
//-------------------------------------------------------

//---------------------------------------------------
// FILE RECORD API - KAFKA RECORD LOGIC - synchronous

// reads a file record from the filesystem, if no name is supplied then the most recent record is read
exports.readFileRecord = function (filePath, file) {
    if (file === undefined) {
        file = fs.readdirSync(filePath).filter(el => require('path').extname(el) === '.json').sort().reverse()[0];
    }
    var contents = fs.readFileSync(`${filePath}/${file}`, 'utf8');
    return { file: file, contents: JSON.parse(contents) };
}

// writes a file record to the filesystem, the name is a suffixed timestamp
exports.writeFileRecord = function (filePath, contents) {
    var suffix = 0;
    var fileRecordPath;
    filePath += `/${Date.now().toString()}`;

    fs.writeFileSync(`${filePath}.tmp`, JSON.stringify(contents,null,2));
    while(fs.existsSync(`${filePath}${suffix.toString()}.json`)) suffix += 1;
    fileRecordPath = `${filePath}${suffix.toString()}.json`;
    fs.renameSync(`${filePath}.tmp`,fileRecordPath);

    return path.basename(fileRecordPath);
}
// FILE RECORD API - KAFKA RECORD LOGIC - synchronous
//---------------------------------------------------

//--------------------------------
// RECORD FOLDER API - synchronous

// adds a full folder path 
exports.addFolder = function (folderPath) {
    console.log(`Adding folder: ${folderPath}`);
    fs.mkdirSync(folderPath, { recursive: true });
}

// removes a full folder path with file contents
exports.removeFolder = function (folderPath) {
    console.log(`Removing folder: ${folderPath}`);
    fs.rmSync(folderPath, { recursive: true, force: true }, folderPath);
}
// RECORD FOLDER API - synchronous
//--------------------------------
///////////////////////////////////////////////////////////////////////////////

