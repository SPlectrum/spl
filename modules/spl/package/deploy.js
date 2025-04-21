// spl/package/deploy
// deploys a module package
const spl = require("../spl")
const package = require("./package.js")

exports.default = function spl_package_deploy ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const root = input.headers.spl.package.root;
    const folder = input.headers.spl.package.folder;
    const rootPath = `${((root==="")?"":`/${root}`)}${((folder==="")?"":`/${folder}`)}`;

    const packageRef = `spl/package.${input.headers.spl.package.name.replace( ".", "_" )}`;
    const packageContents = spl.wsRef( input, packageRef ).value;
    for ( key in packageContents ) {

        var folderName = key.substring(0,key.lastIndexOf("/"));
        var fileName = key.substring(key.lastIndexOf("/")+1)
        package.addFolder(`${cwd}${rootPath}${folderName}`);
        if(fileName.length > 0) package.putFile(`${cwd}${rootPath}${key}`, packageContents[key]);
    }

    input.headers.spl.request.status = "completed";
    return input;
}
