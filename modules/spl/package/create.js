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
    const packageRef = `spl/package.${spl.fURI ( input.headers.package.name )}`;
    spl.wsSet ( input, packageRef, { headers: { package: { name: input.headers.package.name } }, value: {} } );
    const packageContents = spl.wsRef ( input, packageRef ).value;
    function iterateFolder ( folderPath ) {
        var contents = package.folderContents ( package.path ( cwd, root, folderPath ) );
        if ( contents.length === 0 ) packageContents[`${folderPath}/`] = {};
        else {
            for ( var i=0; i<contents.length; i++ ) {
                var currentPath = `${folderPath}/${contents[i]}`;
                if ( package.isFile ( package.path ( cwd, root, currentPath ) ) ) packageContents[currentPath] = package.getFile( package.path ( cwd, root, currentPath ) );
                else iterateFolder ( currentPath );
            }   
        }
    }
    iterateFolder(`/${input.headers.spl.package.folder}`);
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
