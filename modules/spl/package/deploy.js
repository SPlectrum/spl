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
    const dir = input.headers.spl.package.dir;
    const packageRef = `spl/package.${spl.fURI ( input.headers.spl.package.name )}`;

    const packageContents = spl.wsRef( input, packageRef ).value;
    for ( key in packageContents ) {
        var dirName = key.substring(0,key.lastIndexOf("/"));
        var fileName = key.substring(key.lastIndexOf("/")+1)
        package.addDir ( package.path ( cwd, root, dir, dirName ) );
        if ( fileName.length > 0 ) package.putFile ( package.path ( cwd, root, dir, key ), packageContents[key] );
    }
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
