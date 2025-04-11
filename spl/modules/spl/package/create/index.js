// spl/package/create
// create a module package
const package = require("../package.js")

// This implementation is filesystem only
// when going multi repo, the logic of this command must move to data.fs

function spl_package_create ( input ) {
    const inputSpl = input.headers.spl;
    const cwd = inputSpl.execute.cwd;
    const root = inputSpl.package.root;
    const folder = inputSpl.package.folder;
    var rootPath = `${cwd}/${root}`;
    var packageContents = {};

    function iterateFolder (folderPath) {
        var contents = package.folderContents(`${rootPath}/${folderPath}`);
        for ( var i=0; i<contents.length; i++ ) {
            var currentPath = `${folderPath}/${contents[i]}`;
            if(contents[i].substring(contents[i].length-3) === ".js" ) packageContents[currentPath] = package.getFile(`${rootPath}/${currentPath}`);
            else iterateFolder(currentPath);
        }   
    }

    iterateFolder(folder, packageContents);
    input.value = packageContents;

    inputSpl.request.status = "completed";
    return input;
}
exports.default = spl_package_create;