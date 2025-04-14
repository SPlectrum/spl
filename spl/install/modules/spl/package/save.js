// spl/package/save
// saves a package file to a folder
const package = require("./package.js")

exports.default = function spl_package_save ( input ) {
    const inputSpl = input.headers.spl;
    const cwd = inputSpl.execute.cwd;
    const root = inputSpl.package.root;
    const folder = inputSpl.package.folder;
    const file = inputSpl.package.file;

    const folderPath = `${cwd}/${root}/${folder}`;

    package.addFolder(folderPath);
    package.putFile(`${folderPath}/${file}`, JSON.stringify(input.value,null,2));

    inputSpl.request.status = "completed";
    return input;
}
