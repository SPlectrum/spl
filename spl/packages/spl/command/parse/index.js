// spl/command/parse

function spl_command_parse (input) { 
    line = input.value.split(" ");
    var action = line[1];
    var person = line.slice(2).join(" ");
    input.headers.spl.execute.status = "new-command";
    input.value = {
        "headers": { "action": "command/" + line[1], "status": "pending" },
        "value": { "person": person } 
      }
    return input 
}

exports.default = spl_command_parse;
