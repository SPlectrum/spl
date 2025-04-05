const cwd = process.cwd();

var args = process.argv[2].split(" ");
var procIds = args[0].split(",");
var procId;
if(procIds[0]==="cmd.exe") procId = procIds[1];
else procId = procIds[0];
args.shift();

switch(args[0]){
    case "boot": case "system": case "client": session = args[0]; args.shift(); break;
    default:  session = "client";
}

var rawRequest = {
    "headers": { 
        "spl": { 
            "execute": {
                "action": "spl/execute/initialise", "status": "new", "session": session, "cwd": cwd 
            },
            "request": {
                "action": "spl/command/execute", "status": "pending" 
            }
        }
    },
    "value": {
        "cwd": cwd,
        "procId": procId,
        "session": session,
        "commandString": args
     }
}
//console.log(JSON.stringify(rawRequest));
require(`${cwd}/packages/spl/data/queue`).default(rawRequest);


