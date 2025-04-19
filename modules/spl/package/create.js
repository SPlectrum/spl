// spl/package/create
// create a module package
const package = require("./package")

exports.default = function spl_package_create ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const root = input.headers.spl.package.root;
    const folder = input.headers.spl.package.folder;
    var rootPath = `${cwd}/${root}`;
    const packagePath = ((folder === "") ? root : `${root}/${folder}`)
    input.value["spl/package"][packagePath] = { headers: { package: { root: root, folder: folder } }, value: {} };
    const packageContents = input.value["spl/package"][packagePath].value

    function iterateFolder (folderPath) {
        var contents = package.folderContents(((folderPath === "") ? rootPath : `${rootPath}/${folderPath}`));
        if ( contents.length == 0 ) {
            packageContents[folderPath] = undefined;
        } else {
            for ( var i=0; i<contents.length; i++ ) {
                var currentPath = `${folderPath}/${contents[i]}`;
                if(package.isFile(`${rootPath}/${currentPath}`)) packageContents[currentPath] = package.getFile(`${rootPath}/${currentPath}`);
                else iterateFolder(currentPath);
            }   
        }
    }
    iterateFolder(folder);

    input.headers.spl.request.status = "completed";
    return input;
}
