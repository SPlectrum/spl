//  name        Remove a Package
//  URI         spl/package/remove
//  type        API Method
//  description Removes a package from an install.
//              A package in this context is assumend to be a hive,
//              a top folder where everything underneath belongs to the package.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl")
const package = require("./package")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_package_remove ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const root = input.headers.spl.package.root;
    const folder = input.headers.spl.package.folder;
    const basePath = package.path ( cwd, root, folder );

    const packageRef = `spl/package.${input.headers.spl.package.name.replace ( ".", "_" )}`;
    const folders = spl.wsRef ( input, packageRef ).value;
    for ( key in folders ) package.removeFolder( `${basePath}${key}` );

    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
