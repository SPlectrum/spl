const { randomUUID } = require('crypto');
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

var command = 
{
    headers:
    {
        data:
        {
            repo: "data",
            folder: `clients/${session}/requests`
        }
    },
    value: 
    {
        UUID: randomUUID(), 
        cwd: cwd, 
        procId: procId, 
        session: session, 
        commandString: args
    }
}
console.log(JSON.stringify(command,null,2));
command = require(`${cwd}/packages/spl/command/queue`).default(command);
//console.log(JSON.stringify(command,null,2));

