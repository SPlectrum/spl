// spl/package/deploy
// deploys a module package
const package = require("./package.js")

exports.default = function spl_package_deploy ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const root = input.headers.spl.package.root;
    const folder = input.headers.spl.package.folder;
    var rootPath = `${cwd}/${root}`;

    for ( key in input.value ) {
        console.log(key.substring(0,key.lastIndexOf("/")));
        package.addFolder(`${cwd}/${root}/${folder}/${key.substring(0,key.lastIndexOf("/"))}`);
        package.putFile(`${cwd}/${root}/${folder}/${key}`, input.value[key]);
    }

    input.headers.spl.request.status = "completed";
    return input;
}
