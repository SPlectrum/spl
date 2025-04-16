// spl/command/parse
const command = require("./command");

exports.default = function spl_command_parse (input) { 

  splCmd = input.headers.spl.command;
  splCmd.parsed = {};
  var registeredCommand;

  var result = command.parse(splCmd.commandString);
  var commandAction = result.command;
  if(input.value[commandAction]) {
    registeredCommand = commandAction;
    splCmd.parsed[commandAction] = [];
    if(result._unknown) {
      result = command.parse(result._unknown, input.value[commandAction])
      splCmd.parsed[commandAction] = result;
    }
  }

  if(result._unknown) {
    result = command.parse(result._unknown)
    commandAction += "/" + result.command;
    if(input.value[commandAction]) {
      registeredCommand = commandAction;
      splCmd.parsed[commandAction] = [];
      if(result._unknown) {
        result = command.parse(result._unknown, input.value[commandAction])
        splCmd.parsed[commandAction] = result;
      }
    }
  }

  if(result._unknown) {
    result = command.parse(result._unknown)
    commandAction += "/" + result.command;
    if(input.value[commandAction]) {
      registeredCommand = commandAction;
      splCmd.parsed[commandAction] = [];
      if(result._unknown) {
        result = command.parse(result._unknown, input.value[commandAction])
        splCmd.parsed[commandAction] = result;
      }
    }
  }

  if(registeredCommand) {

    input.value = {
      headers: { spl: { request: { action: registeredCommand, status: "pending" } } },
      value: splCmd.parsed
    }
    
    input.headers.spl.request.execute_next = "spl/execute/set-request"
    input.headers.spl.request.status = "execute";
//    input.headers.spl.request.status = "completed";

  } else input.headers.spl.request.status = "completed";
  
  return input 
}
