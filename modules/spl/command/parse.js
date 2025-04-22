//  name        Parse the commandline string
//  URI         spl/command/parse
//  type        API Method
//  description Parses the commandline and sets the requested action.
//              Uses the command-line-args module
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl");
const command = require("./command");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_parse (input) { 

  splCmd = spl.wsGet(input, "spl/command.value");
  parseOptions = spl.wsGet(input, `spl/data.${input.headers.spl.request.parseOptions}.value`);
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
          splCmd.parsed[commandAction] = { headers: {}, value: result };
        }
      }
    }
    if( result._unknown && --counter > 0 ) parseCommand();   
  }
  parseCommand();

  if(registeredCommand) {

    spl.wsSet(input, "spl/execute/set-request", { 
      headers: { spl: { request: { action: registeredCommand, status: "pending" } } }, value: splCmd.parsed });
    input.headers.spl.request.execute_next = "spl/execute/set-request"
    input.headers.spl.request.status = "execute";
  } 
  else input.headers.spl.request.status = "completed";
  
  return input 
}
///////////////////////////////////////////////////////////////////////////////
