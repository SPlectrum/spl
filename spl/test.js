const spl = require("./modules/spl/spl.js");

// it expects the type of session - boot, system or client
var session = ( process.argv[2] == undefined ) ? "boot" : process.argv[2];
const cwd = process.cwd();

var testExecute =
{
    headers: 
    { 
        spl: 
        { 
            execute: { action: "spl/execute/initialise", status: "new", session: session, cwd: cwd },
            request: { action: "spl/package/create", status: "pending" },
            package: { root: "modules", folder: "spl/package" }
        }
    }
}
/*    value: 
    {
        "backup": [],
        "data/clients/boot/requests": [ { file: "readMe.txt", contents: "Client requests folder" } ],
        "data/clients/boot/responses": [ { file: "readMe.txt", contents: "Client responses folder" } ],
        "metadata": [],
        "modules": [],
        "runtime": [],
        "tools": []
    }
}*/
var output = spl.moduleAction(testExecute, "spl/package/create");

output.headers.spl.package.root = "install";
output.headers.spl.package.folder = "modules";

var output = spl.moduleAction(testExecute, "spl/package/deploy");

console.log(JSON.stringify(output,null,2));
