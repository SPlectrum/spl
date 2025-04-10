// spl/data/data.js
// A library of useful functions
const path = require('path');
const fs = require('fs');

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