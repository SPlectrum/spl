//  name        Create a Package
//  URI         spl/package/create
//  type        API Method
//  description Creates a new package from an existing data or module install
//              It creates a package of parts of an existing install.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const package = require("./package")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_package_create ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const root = input.headers.spl.package.root;
    const folder = input.headers.spl.package.folder;
    var rootPath = `${cwd}/${root}`;
    const packageName = input.headers.package.name;
    const packageRef = `spl/package.${packageName.replace(".","_")}`;

    spl.wsSet ( input, packageRef, { headers: { package: { name: packageName } }, value: {} } );
    const packageContents = spl.wsRef ( input, packageRef ).value;

    function iterateFolder (folderPath) {
        var contents = package.folderContents(((folderPath === "") ? rootPath : `${rootPath}/${folderPath}`));
        if ( contents.length === 0 ) {
            packageContents[`${folderPath}/`] = {};
        } else {
            for ( var i=0; i<contents.length; i++ ) {
                var currentPath = `${folderPath}/${contents[i]}`;
                if(package.isFile(`${rootPath}/${currentPath}`)) packageContents[currentPath] = package.getFile(`${rootPath}/${currentPath}`);
                else iterateFolder(currentPath);
            }   
        }
    }
    iterateFolder(`/${folder}`);

    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
