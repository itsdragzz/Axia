const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js');

module.exports.config = {
    name: "design",
    aliases: []
}


module.exports.run = async (client, message, args) => {

    const args1 = args.slice(1).join(' ')

    const errorembed = new Discord.MessageEmbed()
        .setTitle(`Error!`)
        .setDescription("Please use this format")
        .setFields(
            { name: 'Format:', value: `,design <logo/banner/thumbnail> <other relevent information>`, inline: false },
            { name: 'Example:', value: `,design logo I want a logo with the name "dragz" on it. I want the colours to be red and black, please use this as a reference: https://i.imgur.com/3v37aIh.png%7D`, inline: false },
        )
        .setColor("#ffffff")


    if (!args1) return message.channel.send({ embeds: [errorembed] });

    if (args[0] == "logo" || args[0] == "banner" || args[0] == "thumbnail") {

        let embed = new Discord.MessageEmbed()
            .setTitle(`New request!`)
            //.setAuthor(message.author.tag, message.author.displayAvatarURL())
            //.setDescription(args1)
            .addFields(
                { name: 'Client name:', value: `${message.author.tag}`, inline: false },
                { name: 'Type of design:', value: `${args[0]}`, inline: false },
                { name: 'Information:', value: `${args1}`, inline: false },
            )
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(`Thanks for requesting at ${message.guild.name}`)

        message.channel.send({ embeds: [embed] });

    } else {
        return message.channel.send({ embeds: [errorembed] })
    }


}


//send specific message for a specific bot
//private command, only the owner can access it

