//  name        Create a Package
//  URI         spl/package/create
//  type        API Method
//  description Creates a new package from an existing data or module install
//              It creates a package of parts of an existing install.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const package = require("./package")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_package_create ( input ) {

    const cwd = input.headers.spl.execute.cwd;
    input.headers.spl.package.create = package.setLocation(input.headers.spl.package.create);
    const repo = input.headers.spl.package.create.repo;
    const packageRef = `spl/package.${spl.fURI ( input.headers.spl.package.create.file )}`;
    spl.wsSet ( input, packageRef, { headers: { spl: { package: { name: input.headers.spl.package.create.file } } }, value: {} } );
    const packageContents = spl.wsRef ( input, packageRef ).value;

    function iterateDir ( dirPath ) {
        var contents = package.dirContents ( package.path ( cwd, repo, dirPath ) );
        if ( contents.length === 0 ) packageContents[`${dirPath}/`] = {};
        else {
            for ( var i=0; i<contents.length; i++ ) {
                var currentPath = `${dirPath}/${contents[i]}`;
                if ( package.isFile ( package.path ( cwd, repo, currentPath ) ) ) packageContents[currentPath] = package.getFile( package.path ( cwd, repo, currentPath ) );
                else iterateDir ( currentPath );
            }   
        }
    }
    iterateDir(`/${input.headers.spl.package.create.dir}`);
    delete input.headers.spl.package.create;
    input.headers.spl.request.status = "completed";
    return input;
}
///////////////////////////////////////////////////////////////////////////////
