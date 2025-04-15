// spl/package/create
// create a module package
const package = require("./package.js")

exports.default = function spl_package_create ( input ) {
    const inputSpl = input.headers.spl;
    const cwd = inputSpl.execute.cwd;
    const root = inputSpl.package.root;
    const folder = inputSpl.package.folder;
    var rootPath = `${cwd}/${root}`;
    input.value = {};

    function iterateFolder (folderPath) {
        var contents = package.folderContents(`${rootPath}/${folderPath}`);
        for ( var i=0; i<contents.length; i++ ) {
            var currentPath = `${folderPath}/${contents[i]}`;
            if(package.isFile(`${rootPath}/${currentPath}`)) input.value[currentPath] = package.getFile(`${rootPath}/${currentPath}`);
//            if(contents[i].substring(contents[i].length-3) === ".js" ) input.value[currentPath] = package.getFile(`${rootPath}/${currentPath}`);
            else iterateFolder(currentPath);
        }   
    }

    iterateFolder(folder);

    inputSpl.request.status = "completed";
    return input;
}
