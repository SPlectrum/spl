//  name        Delete files from archive
//  URI         tools/7zip/delete
//  type        API Method
//  description Remove files from existing archive using 7zip 'd' command.
//              Permanently removes specified files from archive.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl/spl.js")
const zip = require("./7zip.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_7zip_delete(input) {
    // TODO: Implement 7zip delete functionality
    const archive = spl.action(input, 'archive');
    const files = spl.action(input, 'files');
    const password = spl.action(input, 'password');
    
    console.log('7zip Delete Command:');
    console.log('===================');
    console.log('TODO: Implementation pending');
    console.log(`Archive: ${archive}`);
    console.log(`Files to delete: ${files}`);
    if (password) console.log('Password: [protected]');
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////