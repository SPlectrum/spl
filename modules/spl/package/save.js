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
    input.headers.spl.package.save = package.setLocation(input.headers.spl.package.save);
    const repo = input.headers.spl.package.save.repo;
    const dir = input.headers.spl.package.save.dir;
    const dirPath = package.path ( cwd, repo, dir );
    const packageRef = `spl/package.${spl.fURI ( input.headers.spl.package.save.file )}`;
    package.addDir ( dirPath );
    package.putFile ( package.path ( dirPath, input.headers.spl.package.save.file ), JSON.stringify( spl.wsRef ( input, packageRef ), null, 2 ) );
    delete input.headers.spl.package.save;
    input.headers.spl.request.status = "completed";
}
///////////////////////////////////////////////////////////////////////////////
