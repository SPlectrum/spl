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

  const parserOptionsURI = spl.fURI("spl/command", input.value["spl/command"].headers.spl.command.parser.file);
  const parseOptions = spl.wsGet(input, `${parserOptionsURI}.value`);

  var splCmd, result, parseOnly = false, steps, registeredCommand, commandAction, pipeline = [], cmdArray = [];
  function parseCommand() {
    if(result._unknown) {
      result = command.parse(result._unknown)
      commandAction += (commandAction === "") ? result.command : "/" + result.command;
      if(parseOptions[commandAction]) {
        registeredCommand = commandAction;
        splCmd.parsed[commandAction] = [];
        if(result._unknown) {
          result = command.parse(result._unknown, command.activateTypes(structuredClone(parseOptions[commandAction])));
          splCmd.parsed[commandAction] = { headers: {}, value: result };
        }
      }
    }
    if( result._unknown && --counter > 0 ) parseCommand();   
  }

  // for each substring in commandstring array, set splCmd
  // START PARSING SEQUENCE
  // split the commandstring on the pipe symbol
  cmdObject = spl.wsRef(input, "spl/command.value");
  var cmdString = cmdObject.commandString.join(" ").split("!");
  for(var i = 0; i<cmdString.length; i++) {
    cmdObject = structuredClone(cmdObject);
    cmdObject.commandString = cmdString[i].split(" ");
    cmdArray.push(cmdObject);
  }

//  cmdArray = [ spl.wsRef(input, "spl/command.value") ]
  for ( var i = 0; i<cmdArray.length; i++ ) {

    commandAction = "";
    registeredCommand = "";
    splCmd = cmdArray[i];
    splCmd.parsed = {};
    var result = { _unknown: splCmd.commandString };
    var counter = 3;

    // parse global arguments - currently help, steps and test
    result = command.parse(result._unknown, command.activateTypes(structuredClone(parseOptions[commandAction])));
    splCmd.parsed[commandAction] = { headers: {}, value: result };
    if( !(result["test"] === undefined ) ) parseOnly = true;
    if( result["steps"] > 0 ) steps = result["steps"];

    parseCommand();

    if ( registeredCommand != "" ) {
      const newRequest = { action: registeredCommand, status: "pending" };
      newRequest[registeredCommand] = splCmd.parsed[registeredCommand].value;
      if ( steps > 0 ) newRequest.TTL = steps;
      pipeline.push(newRequest);
    }
  }
  
  if ( pipeline.length > 0 ) {
    spl.wsSet(input, "spl/execute/set-pipeline", {
        headers: {}, 
        value: pipeline
    });
  }

  if ( !parseOnly ) {
    input.headers.spl.request.execute_next = "spl/execute/set-request"
    input.headers.spl.request.execute_next = "spl/execute/set-pipeline";
    input.headers.spl.request.status = "execute";
  } else input.headers.spl.request.status = "completed";

return input 
}
///////////////////////////////////////////////////////////////////////////////
