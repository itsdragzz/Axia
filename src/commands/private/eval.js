const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');

module.exports.config = {
    name: "rules",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    const config = require('../../../config.json');
    if (message.author.id !== config.ownerID) return;

  
    const args1 = message.content.split(" ").slice(1);
  
      try {
        const code = args1.join(" ");
        let evaled = eval(code);
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
  
        message.channel.send((evaled), { code: "xl" });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
      }
}


//send specific message for a specific bot
//private command, only the owner can access it

