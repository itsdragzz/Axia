const Discord = require("discord.js")
const punishments = require('../../models/punishments');
const { Permissions } = require('discord.js');

module.exports.config = {
    name: "removewarn",
    aliases: []
}

module.exports.run = async (client, message, args) => {


        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]);

        
//runs through all the possibilities
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)){
        return message.channel.send(`You don't have the Required Permission!\n**Required Permission: \`MANAGE_MESSAGES\`**`);
    } else if (!member) { 
        return message.channel.send(`Provide a valid person`);
    } else if (!args[1]) {
        return message.channel.send(`Please provide a case number`);
    } else {
        
        const data = await punishments.findOne({
            GuildID: message.guild.id,
            UserID: member.id
        });

        if (!data) { //if there is no data
            return message.channel.send(`There is no case number ${args[1]} for that user, please provide a vaild one.`)
        } else {
            data.Punishments.splice(parseInt(args[1]) - 1, 1); //removing the warn
            await data.save(); //saving the data
        
            if (data.Punishments.length < 1) {
                await punishments.findOneAndRemove({ GuildID: message.guild.id, UserID: member.id });
            } //if the data is less than 1, remove the whole user data completely 
        
            const endEmbed = new Discord.MessageEmbed()
                .setDescription(`**Successfully** removed warning **${args[1]}** from ${member}!`)
                .setColor(0x00FF00)
            message.channel.send({ embeds: [endEmbed] }); 
        }
    }
}