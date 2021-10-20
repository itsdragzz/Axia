const Discord = require("discord.js")
const ticket = require("../../models/setup");

module.exports.config = {
    name: "ticket",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    
    try {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            const NotEnoughPerms = new Discord.MessageEmbed()
                .setColor(`#ffffff`)
                .setTitle('Error')
                .setDescription(`You do not have enough permissions to setup the server!\nYou must have the permission \`ADMINISTRATOR\``)
                .setColor("RED")
                .setFooter(`Asked by ${message.author.tag}`)

            return message.channel.send({ embeds: [NotEnoughPerms] });
        } else if (!message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            const NotEnoughPermsMe = new Discord.MessageEmbed()
                .setColor(`#ffffff`)
                .setTitle('Error')
                .setDescription(`Please give me the permission \`ADMINISTRATOR\``)
                .setColor("RED")
                .setFooter(`Asked by ${message.author.tag}`)

            return message.channel.send({ embeds: [NotEnoughPermsMe] });
        } else {
            





        }




    } catch (e) {
        message.channel.send(`There was an error: ${e}`)
        console.log(e)
    }


    

}