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
  const parseOptions = spl.wsGet(input, `${parserOptionsURI}`).value;

  var splCmd, result, parseOnly = false, steps, registeredCommand, commandAction, pipeline = [], cmdArray = [], help = [], commandOptions = [];
  input.headers.spl.command.help = help;
  function parseCommand() {
    if(result._unknown) {
      result = command.parse(result._unknown)
      commandAction += (commandAction === "") ? result.command : "/" + result.command;
      if ( command.exists ( parseOptions, commandAction ) ) {
        registeredCommand = commandAction;
        splCmd.parsed[commandAction] = [];
        if(result._unknown) {
          commandOptions = command.getOptions ( parseOptions, commandAction );
          result = command.parse ( result._unknown, commandOptions );
          // check help flag - prepare to set help pipeline
          if ( result.help ) help.push(registeredCommand)
          splCmd.parsed[commandAction] = { headers: {}, value: result };
        }
      }
    }
    if( result._unknown && --counter > 0 ) parseCommand();   
  }

  // for each substring in commandstring array, set splCmd
  // START PARSING SEQUENCE
  // split the commandstring on the pipe symbol
  cmdObject = spl.wsRef(input, "spl/command").value;
  var cmdString = cmdObject.commandString.join(" ").split("_!_");
  for(var i = 0; i<cmdString.length; i++) {
    cmdObject = structuredClone(cmdObject);
    cmdObject.commandString = cmdString[i].split(" ");
    cmdArray.push(cmdObject);
  }
  spl.wsSet(input, "spl/command.value", cmdArray);

//  cmdArray = [ spl.wsRef(input, "spl/command.value") ]
  for ( var i = 0; i<cmdArray.length; i++ ) {

    commandAction = "";
    registeredCommand = undefined;
    splCmd = cmdArray[i];
    splCmd.parsed = {};
    var result = { _unknown: splCmd.commandString };
    var counter = 3;

    // parse global arguments - currently help, steps and test
    commandOptions = command.getOptions ( parseOptions, commandAction );
    result = command.parse ( result._unknown, commandOptions );
    splCmd.parsed [ commandAction ] = { headers: {}, value: result };
    if( !(result [ "test" ] === undefined ) ) parseOnly = true;
    if( result [ "steps" ] > 0 ) steps = result [ "steps" ];
    if ( result.help ) help.push ( commandAction );

    parseCommand();

    if ( registeredCommand != undefined ) {
      const newRequest = { action: registeredCommand, status: "pending" };
      newRequest[registeredCommand] = splCmd.parsed[registeredCommand].value;
      if ( steps > 0 ) newRequest.TTL = steps;
      pipeline.push(newRequest);
    }
  }

  // switch to help pipeline if help flag was set
  if( help.length > 0 ) {
    pipeline = [ { action: "spl/command/help", "spl/command/help": help } ]
  }

  if ( !parseOnly ) {
    if ( pipeline.length > 0 ) spl.wsSet(input, "spl/execute.set-pipeline", { headers: { spl: { execute: { pipeline: pipeline } } }, value: {} });
    spl.gotoExecute ( input, "spl/execute/set-pipeline" );
  } else spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
