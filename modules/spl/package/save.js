//  name        Save a Package
//  URI         spl/package/save
//  type        API Method
//  description Saves a package to file.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl")
const package = require("./package.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_package_save ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const root = input.headers.spl.package.root;
    const folder = input.headers.spl.package.folder;
    const folderPath = package.path ( cwd, root, folder );
    const packageRef = `spl/package.${spl.fURI ( input.headers.spl.package.name )}`;
    package.addFolder ( folderPath );
    package.putFile ( package.path ( folderPath, input.headers.spl.package.name ), JSON.stringify( spl.wsRef ( input, packageRef ), null, 2 ) );
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
