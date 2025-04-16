const spl = require("../modules/spl/spl.js");
const cwd = process.cwd();

console.log(process.argv)

var command = {
    headers: { 
        spl: { 
            execute: { cwd: cwd, modules: "../modules" }, 
            command: { action: "spl/command/queue" }
        } 
    },
    value: {
        "spl/command": {
            UUID: spl.generateUUID(), 
            cwd: cwd, 
            procId: 0, 
            session: "client", 
            commandString: process.argv.slice(2)
        }
    }
}
console.log(JSON.stringify(command,null,2));
command = spl.commandAction(command);

