const Discord = require("discord.js")
const punishments = require('../../models/punishments');
const { Permissions } = require('discord.js');

module.exports.config = {
    name: "viewwarns",
    aliases: ["viewwarn", "warns"]
}

module.exports.run = async (client, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

    //running through all the possibilities 
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        return message.channel.send(`You don't have the Required Permission!\n**Required Permission: \`MANAGE_MESSAGES\`**`)
    }
    if (!member) {
        return message.channel.send(`Provide a valid person`)
    }

    const data = await punishments.find({ GuildID: message.guild.id, UserID: member.id });

    if (!data.length) {
        const permEmbed2 = new Discord.MessageEmbed()
            .setDescription(`**This user has no warns**`)
        return message.channel.send({ embeds: [permEmbed2] });

    } else {

        let embed = new Discord.MessageEmbed()


            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(
                data.map((d) => {
                    return d.Punishments.map(
                        (w, i) =>
                            `**${i + 1}.** **${w.PunishType}**
                **Reason:** ${w.Reason}
                **Moderator:** ${message.guild.members.cache.get(w.Moderator).user.tag}`
                    ).join("\n\n");
                }).join("\n")
            )
            .setColor("9553EF")


        message.channel.send({ embeds: [embed] });


        /*
        const embed = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(viewd)
            .setColor("9553EF")
        */


        // message.channel.send({ embeds: [embed] });
        //message.channel.send(viewd);

    }
}