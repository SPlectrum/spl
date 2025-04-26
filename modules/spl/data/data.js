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

// create a properly formatted file path
exports.path = function ( ...args ){
    return path.join(...args);
}

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
