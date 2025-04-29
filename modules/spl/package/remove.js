//  name        Remove a Package
//  URI         spl/package/remove
//  type        API Method
//  description Removes a package from an install.
//              A package in this context is assumend to be a hive,
//              a top dir where everything underneath belongs to the package.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl")
const package = require("./package")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_package_remove ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const root = input.headers.spl.package.root;
    const dir = input.headers.spl.package.dir;
    const basePath = package.path ( cwd, root, dir );
    const packageRef = `spl/package.${spl.fURI ( input.headers.spl.package.name )}`;
    const dirs = spl.wsRef ( input, packageRef ).value;
    for ( key in dirs ) package.removeDir( package.path ( basePath, key ) );
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
