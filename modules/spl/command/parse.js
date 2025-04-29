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
  if ( input.value[ parserOptionsURI ] === undefined ) {
    input.headers.spl.blob.get = [ input.value["spl/command"].headers.spl.command.parser ];
    input.headers.spl.blob.get[0].reference = [ spl.fURI("spl/command", input.value["spl/command"].headers.spl.command.parser.file) ];
    input.headers.spl.request.blob_next = "spl/blob/get";
    input.headers.spl.request.status = "blob";
    input.headers.spl.request.repeat = true;
    return input;
  }
  input.value[parserOptionsURI] = JSON.parse(input.value[parserOptionsURI]);
  const parseOptions = spl.wsGet(input, `${parserOptionsURI}.value`);
  splCmd = spl.wsRef(input, "spl/command.value");
  splCmd.parsed = {};
  var parseOnly = false;
  var steps;
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

  // parse global arguments - currently help, steps and test
  result = command.parse(result._unknown, parseOptions[commandAction]);
  splCmd.parsed[commandAction] = { headers: {}, value: result };
  if( !(result["test"] === undefined ) ) parseOnly = true;
  if( result["steps"] > 0 ) steps = result["steps"];

  parseCommand();

  if ( registeredCommand ) {
    const newRequest = { headers: { spl: { request: { action: registeredCommand, status: "pending" } } }, value: splCmd.parsed };
    if ( steps > 0 ) newRequest.headers.spl.request.TTL = steps;
    spl.wsSet( input, "spl/execute/set-request", newRequest );
  }

  if ( !parseOnly ) {
    input.headers.spl.request.execute_next = "spl/execute/set-request"
    input.headers.spl.request.status = "execute";
  } else input.headers.spl.request.status = "completed";

return input 
}
///////////////////////////////////////////////////////////////////////////////
