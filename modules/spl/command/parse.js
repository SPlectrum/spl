// spl/command/parse
const command = require("./command");

exports.default = function spl_command_parse (input) { 

  splCmd = input.value["spl/command"];
  parseOptions = input.value["spl/data"][input.headers.spl.request.parseOptions].value;
  splCmd.parsed = {};
  var registeredCommand;
  var commandAction = "";
  var result = { _unknown: splCmd.commandString };
  var counter = 3;

  function parseCommand() {
    if(result._unknown) {
      result = command.parse(result._unknown)
      commandAction += (commandAction === "") ? result.command : "/" + result.command;
      if(parseOptions[commandAction]) {
        registeredCommand = commandAction;
        splCmd.parsed[commandAction] = [];
        if(result._unknown) {
          result = command.parse(result._unknown, parseOptions[commandAction]);
          splCmd.parsed[commandAction] = result;
        }
      }
    }
    if( result._unknown && --counter > 0 ) parseCommand();   
  }
  parseCommand();

  if(registeredCommand) {
    input.value["spl/execute/set-request"] = {
      headers: { spl: { request: { action: registeredCommand, status: "pending" } } },
      value: splCmd.parsed
    }

    input.headers.spl.request.execute_next = "spl/execute/set-request"
    input.headers.spl.request.status = "execute";
//    input.headers.spl.request.status = "completed";

  } else input.headers.spl.request.status = "completed";
  
  return input 
}
