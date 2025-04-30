const spl = require("../../../modules/spl/spl.js");

// Set SPlectrum and client root directory, extract command string
var root = process.cwd().split("/");
if (root.length === 1 ) root = root[0].split(`\\`);
const splRoot = root.slice(0,root.length-2).join("/");
const session = root[root.length-1];
const clientRoot = root.slice(root.length - 2).join("/")
const commandString = process.argv.slice(2);

var command = {
    headers: { 
        spl: { 
            execute: { cwd: splRoot, session: session, modules: "../modules", TTL: 100 }, 
            request: { action: "spl/command/execute", command: { UUID: spl.generateUUID(), cwd: clientRoot, commandString: commandString } }
        } 
    },
    value: {}
}
console.log(JSON.stringify(command,null,2));
command = spl.moduleAction(command, "spl/execute/execute");
console.log(JSON.stringify(command,null,2));

