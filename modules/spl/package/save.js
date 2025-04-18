// spl/package/save
// saves a package file to a folder
const package = require("./package.js")

exports.default = function spl_package_save ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const root = input.headers.spl.package.root;
    const folder = input.headers.spl.package.folder;
    const file = input.headers.spl.package.file;

    const folderPath = `${cwd}/${root}/${folder}`;

    package.addFolder(folderPath);
    package.putFile(`${folderPath}/${file}`, JSON.stringify(input.value,null,2));

    input.headers.spl.request.status = "completed";
    return input;
}
