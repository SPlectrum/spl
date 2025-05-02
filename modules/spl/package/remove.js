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
    input.headers.spl.package.deploy = package.setLocation(input.headers.spl.package.remove);

    const repo = input.headers.spl.package.remove.repo;
    const dir = input.headers.spl.package.remove.dir;
    const basePath = package.path ( cwd, repo, dir );
    const packageRef = `spl/package.${spl.fURI ( input.headers.spl.package.remove.file )}`;
    const dirs = spl.wsRef ( input, packageRef ).value;
    for ( key in dirs ) package.removeDir( package.path ( basePath, key ) );
    delete input.headers.spl.package.remove;
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
