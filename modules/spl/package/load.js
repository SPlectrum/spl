//  name        Load a Package
//  URI         spl/package/load
//  type        API Method
//  description Loads a package from file.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const package = require("./package")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_package_load ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const source = input.headers.spl.package;
    const output = package.getFile ( package.path ( cwd, source.root, source.dir, source.name ) );
    spl.wsSet ( input, `spl/package.${spl.fURI ( source.name )}`, JSON.parse( output ) );
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
