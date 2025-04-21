// spl/package/load
// loads a package
const spl = require("../spl.js")
const package = require("./package")

exports.default = function spl_package_load ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    const source = input.headers.spl.package;

    const output = package.getFile( `${cwd}/${source.root}/${source.folder}/${source.name}` );
    spl.wsSet ( input, `spl/package.${source.name.replace(".","_")}`, JSON.parse( output ) );

    input.headers.spl.execute.action = "spl/execute/set-next";
    input.headers.spl.request.status = "completed";
    return input;
}
