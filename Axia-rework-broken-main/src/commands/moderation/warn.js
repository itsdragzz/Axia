const Discord = require("discord.js")
const { Permissions } = require('discord.js');
const punishments = require('../../models/punishments');

module.exports.config = {
    name: "warn",
    aliases: []
}

module.exports.run = async (client, message, args) => {


    try {
        const toWarn = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        const reason = args.slice(1).join(" ")

        //runs through all the possiblities of what happends when one runs the command 
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            const misperms = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle(`Error, you do not have perms`)
                .setDescription("Sorry, you do not have the perms to warn that user")
            return message.channel.send({ embeds: [misperms] })

        } else if (!toWarn) {
            const nothere = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle(`Error, not in guild`)
                .setDescription("The user you are trying to warn is not alive or in the server, please actually mention someone that is...")
            return message.channel.send({ embeds: [nothere] })

        } else if (toWarn.id === message.author.id) {
            const embed1 = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle(`Error, selfwarn`)
                .setDescription("The user you are trying to warn is yourself")
                .addFields(
                    { name: 'Useage', value: '`,ban <member> <reason>`', inline: true },
                    { name: 'Required permission', value: 'SEND_MESSAGES', inline: true },
                )
                .setFooter(`Asked by ${message.author.tag}`)
            return message.channel.send({ embeds: [embed1] })

        } else if (!reason) {
            const NoReasonToWarn = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle(`Error, no reason`)
                .setDescription("Provide a reason to warn someone please")
                .addFields(
                    { name: 'Useage', value: '`,ban <member> <reason>`', inline: true },
                    { name: 'Required permission', value: 'SEND_MESSAGES', inline: true },
                )
                .setFooter(`Asked by ${message.author.tag}`)
            return message.channel.send({ embeds: [NoReasonToWarn] })
            //if no reason, prints out "NoReasonToWarn"

        } else if (toWarn.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            const NotEnoughPerms = new Discord.MessageEmbed()
                .setColor(`#ffffff`)
                .setTitle('Error')
                .setDescription(`They have admin perms so I can not warn that user`)
                .addFields(
                    { name: 'Useage', value: '`,ban <member> <reason>`', inline: true },
                    { name: 'Required permission', value: 'SEND_MESSAGES', inline: true },
                )
                .setColor("RED")
                .setFooter(`Asked by ${message.author.tag}`)

            return message.channel.send({ embeds: [NotEnoughPerms] });
            //if the permission of the user is too high, it wil return NotEnoughPerms

        } else {
            const data = await punishments.findOne({ GuildID: message.guild.id, UserID: toWarn.id, }); //find that in a database

            if (!data) {
                let newData = new punishments({
                    GuildID: message.guild.id,
                    UserID: toWarn.id,
                    Punishments: [
                        {
                            PunishType: 'Warn',
                            Moderator: message.author.id,
                            Reason: reason,
                        },
                    ],
                });
                newData.save();
                //if there is no "punishments" create a new file for the user

                const embeddm = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle(`You have been warned in ${message.guild.name}`)
                    .setDescription(`You (${toWarn}) have been warned for: **${reason}**`)
                    .setFooter(`Warned by ${message.author.tag}`)

                const embed = new Discord.MessageEmbed()
                     .setColor(0x00FF00)
                    .setTitle(`Successfully warned`)
                    .setDescription(`${toWarn} has been warned for: **${reason}**`)
                    .setFooter(`Warned by ${message.author.tag}`)
                message.channel.send({ embeds: [embed] }) && toWarn.send({ embeds: [embeddm] })
                //sends message to use and the channel
            } else {
                data.Punishments.unshift({
                    PunishType: 'Warn',
                    Moderator: message.author.id,
                    Reason: reason,
                });
                data.save();


                const embeddm = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle(`You have been warned in ${message.guild.name}`)
                    .setDescription(`You (${toWarn}) has been warned for: **${reason}**`)
                    .setFooter(`Warned by ${message.author.tag}`)

                const embed = new Discord.MessageEmbed()
                    .setColor('#00A4FF')
                    .setTitle(`Successfully Warned`)
                    .setDescription(`${toWarn} has been warned for: **${reason}**`)
                    .setFooter(`Warned by ${message.author.tag}`)
                message.channel.send({ embeds: [embed] }) && toWarn.send({ embeds: [embeddm] })
            }

        }
        
    } catch (error) {
        console.error(error);
    }
}