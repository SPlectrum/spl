//  name        Deploy a Package
//  URI         spl/package/deploy
//  type        API Method
//  description Deploys a package to an existing install.
//              It is used to deliver data and module packages.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl")
const package = require("./package.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_package_deploy ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const root = input.headers.spl.package.root;
    const folder = input.headers.spl.package.folder;
    const packageRef = `spl/package.${spl.fURI ( input.headers.spl.package.name )}`;

    const packageContents = spl.wsRef( input, packageRef ).value;
    for ( key in packageContents ) {
        var folderName = key.substring(0,key.lastIndexOf("/"));
        var fileName = key.substring(key.lastIndexOf("/")+1)
        package.addFolder ( package.path ( cwd, root, folder, folderName ) );
        if ( fileName.length > 0 ) package.putFile ( package.path ( cwd, root, folder, key ), packageContents[key] );
    }
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
