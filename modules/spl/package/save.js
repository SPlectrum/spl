// spl/package/save
// saves a package file to a folder
const spl = require("../spl")
const package = require("./package.js")

exports.default = function spl_package_save ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const root = input.headers.spl.package.root;
    const folder = input.headers.spl.package.folder;
    const file = input.headers.spl.package.file;

    const folderPath = `${cwd}/${root}/${folder}`;

    const packageName = input.headers.package.name;
    const packageRef = `spl/package.${packageName.replace(".","_")}`;

    package.addFolder( folderPath );
    package.putFile( `${folderPath}/${file}`, JSON.stringify( spl.wsRef ( input, packageRef ), null, 2 ) );

    input.headers.spl.request.status = "completed";
    return input;
}
