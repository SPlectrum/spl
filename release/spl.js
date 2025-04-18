const spl = require("./modules/spl/spl.js");
const cwd = process.cwd();

console.log(process.argv)

var args = process.argv[2].split(" ");
var procIds = args[0].split(",");
var procId;
if(procIds[0]==="cmd.exe") procId = procIds[1];
else procId = procIds[0];
args.shift();

if(args.length==0) args = process.argv.slice(3);

console.log(args)

switch(args[0]){
    case "boot": case "system": case "client": session = args[0]; args.shift(); break;
    default:  session = "client";
}

var command = {
    headers: { spl: { execute: { cwd: cwd, modules: "./modules" }, command: { action: "spl/command/queue" } } },
    value: {
        UUID: spl.generateUUID(), 
        cwd: cwd, 
        procId: procId, 
        session: session, 
        commandString: args
    }
}
console.log(JSON.stringify(command,null,2));
command = spl.commandAction(command);

