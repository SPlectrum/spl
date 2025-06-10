//  name        Update archive
//  URI         tools/7zip/update
//  type        API Method
//  description Update existing archive with new/changed files only using 7zip 'u' command.
//              Only adds files that are newer than existing archive entries.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl/spl.js")
const zip = require("./7zip.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_7zip_update(input) {
    // TODO: Implement 7zip update functionality
    const archive = spl.action(input, 'archive');
    const files = spl.action(input, 'files');
    const exclude = spl.action(input, 'exclude');
    const recurse = spl.action(input, 'recurse');
    const password = spl.action(input, 'password');
    
    console.log('7zip Update Command:');
    console.log('===================');
    console.log('TODO: Implementation pending');
    console.log(`Archive: ${archive}`);
    console.log(`Files: ${files}`);
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////