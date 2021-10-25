const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');

module.exports.config = {
    name: "eval",
    aliases: []
}

/**
 * 
 * @private
 * @param {*} client 
 * @param {*} message 
 * @param {*} args 
 * @returns 
 */

module.exports.run = async (client, message, args) => {
    const config = require('../../../config.json');
    if (message.author.id !== config.ownerID) return;
  
  
      try {
        const code = args.slice(0).join(' ')
        let evaled = eval(code);
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
  
        message.channel.send(`\`\`\`\n${evaled}\`\`\``);
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
      }

}


//send specific message for a specific bot
//private command, only the owner can access it

