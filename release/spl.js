const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();

var args = process.argv[2].split(" ");
var procIds = args[0].split(",");
var procId;
if(procIds[0]==="cmd.exe") procId = procIds[1];
else procId = procIds[0];
args.shift();
if(args.length==0) args = process.argv.slice(3);

switch(args[0]){
    case "boot": case "system": case "client": session = args[0]; args.shift(); break;
    default:  session = "client";
}

var command = {
    headers: { 
        spl: { 
            execute: { action: "spl/execute/initialise", status: "new", cwd: cwd, session: session, modules: "./modules" }, 
            request: { action: "spl/command/execute", status: "pending" }
        } 
    },
    value: {
        "spl/command": {
            headers: {},
            value: {
                UUID: spl.generateUUID(), 
                procId: 0, 
                commandString: args
            }
        }
    }
}
console.log(JSON.stringify(command,null,2));
command = spl.moduleAction(command, "spl/execute/execute");
console.log(JSON.stringify(command,null,2));

