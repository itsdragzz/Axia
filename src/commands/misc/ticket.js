const Discord = require("discord.js")
const ticket = require("../../models/tickets");
const { Permissions } = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);



module.exports.config = {
    name: "ticket",
    aliases: []
}

module.exports.run = async (client, message, args) => {

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
        const data = await ticket.findOne({ GuildID: message.guild.id })// TicketID: String

        try {
            if (args[0] == "on") {
                if (!data) {
                    let newData = new ticket({
                        GuildID: message.guild.id,
                        TicketID: "works"
                    });
                    newData.save(); //saves the data


                    const Ticket = new Discord.MessageEmbed()
                    .setTitle("Make a ticket!")
                    .setDescription("Click below to make a new ticket!")

                    const NewTicket = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('NewTicket')
                            .setLabel('Create ticket')
                            .setStyle('SUCCESS'),
                    )



                message.channel.send({ embeds: [Ticket], components: [NewTicket] })

               

                } else if (data) {
                    message.channel.send({ content: `You already have data!` })
                }


            } else if (args[0] == "off") {


                const _DelData = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('aDelData')
                            .setLabel('Yes')
                            .setStyle('DANGER'),
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId('NoData')
                            .setLabel('No')
                            .setStyle('SECONDARY'),
                    );



                message.channel.send({ content: `Are you sure you want to **delete all data**`, components: [_DelData] })



            } else {

                let InvaildFormat = new Discord.MessageEmbed()
                    .setTitle('Error')
                    .setDescription(`Invaild format`)
                    .setFields(
                        { name: 'Format:', value: `,ticket <on/off>`, inline: false },
                        { name: 'Example:', value: `,ticket on catgoryName`, inline: false },
                    )
                    .setColor("RED")
                    .setFooter(`Asked by ${message.author.tag}`)

                return message.channel.send({ embeds: [InvaildFormat] });
            }




            client.on('interactionCreate', async (interaction) => {

           
                if (!interaction.isButton()) return;
                await interaction.deferUpdate();

                if (interaction.customId === 'NewTicket') {
                    

                    const overwrites = [{
                        id: message.guild.roles.everyone.id,
                        deny: ["VIEW_CHANNEL"],
                        type: "role"
                    }, {
                        id: message.author.id,
                        allow: ["VIEW_CHANNEL"],
                        type: "member"
                    }];
                
                    message.guild.channels.create(`ticket - ${interaction.member.displayName} `, {
                        reason: "for ticket system",
                        type: "GUILD_TEXT",
                        permissionOverwrites: overwrites
                    });


                } 
                else if (interaction.customId === "aDelData") {
                    //if (interaction.member.id !== message.author.id) return;
                    await ticket.findOneAndDelete({ GuildID: message.guild.id, TicketID: "works" })
                    await interaction.editReply({ content: 'Deleted the data!', components: [] });
                }

            })


        } catch (e) {
            message.channel.send(`There was an error: ${e}`)
            console.log(e)
        }


    }





}