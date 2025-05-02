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
    input.headers.spl.package.load = package.setLocation(input.headers.spl.package.load);
    const source = input.headers.spl.package.load;
    const output = package.getFile ( package.path ( cwd, source.repo, source.dir, source.file ) );
    spl.wsSet ( input, `spl/package.${spl.fURI ( source.file )}`, JSON.parse( output ) );
    delete input.headers.spl.package.load;
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
