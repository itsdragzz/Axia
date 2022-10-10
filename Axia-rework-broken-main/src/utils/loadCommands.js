const fs = require('fs');

function loadCommands(client) {
	fs.readdir('./src/commands/', (err, cmdfolders) => {

		if (err) console.log(err);

		if(!cmdfolders[0]) return console.log(`can't find that command`);
		cmdfolders.forEach((cmdfolder) => {
			fs.readdir(`./src/commands/${cmdfolder}`, (err, cmds) => {
				if (!cmds) return console.error(`can't find that command in the ${cmdfolder} folder!`);
				cmds = cmds.filter(z => z.split('.')[1] === 'js');
				cmds.forEach((cmd) => {
					const pull = require(`../commands/${cmdfolder}/${cmd}`);
					client.commands.set(pull.config.name, pull);
					pull.config.aliases.forEach((alias) => {
						client.aliases.set(alias, pull.config.name);
					});
				});
			});
		});
	});
}

//this just loads the commands and find the aliases for each command

/*
    for the files, filter it so the end ends with ".js" 
    getting the name of command from 
    module.exports.config = {
    name: "this",
    aliases: []
    }
*/

module.exports = loadCommands;