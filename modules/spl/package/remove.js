// spl/package/remove
// create a set of folders and files from the struccture supplied in input.value
const spl = require("../spl")
const package = require("./package")

exports.default = function spl_package_remove ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const root = input.headers.spl.package.root;
    const folder = input.headers.spl.package.folder;
    const basePath = `${cwd}${((root === "")?"":"/" + root)}${((folder === "")?"":"/" + folder)}`;

    const packageRef = `spl/package.${input.headers.spl.package.name.replace( ".", "_" )}`;
    const folders = spl.wsRef( input, packageRef ).value;
    for ( key in folders ) {
        package.removeFolder( `${basePath}${key}` );
    }

    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
