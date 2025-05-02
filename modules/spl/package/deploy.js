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
    input.headers.spl.package.deploy = package.setLocation(input.headers.spl.package.deploy);

    const repo = input.headers.spl.package.deploy.repo;
    const dir = input.headers.spl.package.deploy.dir;
    const packageRef = `spl/package.${spl.fURI ( input.headers.spl.package.deploy.file )}`;

    const packageContents = spl.wsRef( input, packageRef ).value;
    for ( key in packageContents ) {
        var dirName = key.substring(0,key.lastIndexOf("/"));
        var fileName = key.substring(key.lastIndexOf("/")+1)
        package.addDir ( package.path ( cwd, repo, dir, dirName ) );
        if ( fileName.length > 0 ) package.putFile ( package.path ( cwd, repo, dir, key ), packageContents[key] );
    }
    delete input.headers.spl.package.deploy;
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
