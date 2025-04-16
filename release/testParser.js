const commandLineArgs = require('command-line-args')

/* first - parse the main command name */
let mainDefinitions = [{ name: 'name', defaultOption: true }]
const mainCommand = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true, argv: [ "one-command", "and", "options"] })
console.log(JSON.stringify(mainCommand));

const subCommand = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true, argv: (mainCommand._unknown || []) })
console.log(JSON.stringify(subCommand));