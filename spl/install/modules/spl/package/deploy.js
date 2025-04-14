// spl/package/deploy
// deploys a module package
const package = require("./package.js")

exports.default = function spl_package_deploy ( input ) {
    const inputSpl = input.headers.spl;
    const cwd = inputSpl.execute.cwd;
    const root = inputSpl.package.root;
    const folder = inputSpl.package.folder;
    var rootPath = `${cwd}/${root}`;

    for ( key in input.value ) {
        console.log(key.substring(0,key.lastIndexOf("/")));
        package.addFolder(`${cwd}/${root}/${folder}/${key.substring(0,key.lastIndexOf("/"))}`);
        package.putFile(`${cwd}/${root}/${folder}/${key}`, input.value[key]);
    }

    inputSpl.request.status = "completed";
    return input;
}
