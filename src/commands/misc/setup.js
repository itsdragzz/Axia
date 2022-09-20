const Discord = require("discord.js");
const setup = require("../../models/setup");
const { Permissions } = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports.config = {
    name: "setup",
    aliases: ["set"]
}

/**
 * 
 * @param {string} client 
 * @param {string} message 
 * @param {string} args 
 * @returns 
 * 
 */

module.exports.run = async (client, message, args) => {


    const data = await setup.findOne({ GuildID: message.guild.id }) //tries to find data

    const helpon = new Discord.MessageEmbed()
        .setColor(`#ffffff`)
        .setTitle('Error')
        .setDescription(`Help menu [on]`)
        .addFields(
            { name: 'Staff role', value: '`,setup on staffrole <Mention the role>`', inline: false },
            { name: 'Mute Role', value: '`,setup on muterole <Mention the role>`', inline: false },
            { name: 'Blacklist role', value: '`,setup on blacklist <Mention the role>`', inline: false },
            { name: 'Suggest channel', value: '`,setup on suggest <Mention the channel>`', inline: false },
            { name: 'Report channel', value: '`,setup on report <Mention the channel>`', inline: false },
            { name: 'Design functions', value: '`,setup on design`', inline: false },
            //{ name: '⚠️DELETE ALL DATA⚠️', value: '`,setup deleteall`', inline: false },
        )
        .setColor("RED")
        .setFooter(`Asked by ${message.author.tag} | To set up tickets, run the ticket command`) //for helpon

    const helpoff = new Discord.MessageEmbed()
        .setColor(`#ffffff`)
        .setTitle('Error')
        .setDescription(`Help menu [off]`)
        .addFields(
            { name: 'Staff role', value: '`,setup off staffrole `', inline: false },
            { name: 'Mute Role', value: '`,setup off muterole`', inline: false },
            { name: 'Blacklist role', value: '`,setup off blacklist`', inline: false },
            { name: 'Suggest channel', value: '`,setup off suggest`', inline: false },
            { name: 'Report channel', value: '`,setup off report`', inline: false },
            { name: 'Design functions', value: '`,setup off design`', inline: false },
            { name: 'DELETE ALL DATA', value: '`,setup deleteall`', inline: false },
        )
        .setColor("RED")
        .setFooter(`Asked by ${message.author.tag} | To set up tickets, run the ticket command`) //for hewlpoff



    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('test')
                .setPlaceholder('Please click here for options!')
                .addOptions([
                    {
                        label: 'Setup on',
                        value: 'on',
                        description: 'Options for setup on',
                        emoji: '🔛'
                    },
                    {
                        label: 'Setup off',
                        value: 'off',
                        description: 'Options for setup off',
                        emoji: '📴'
                    },
                ])
        ) //the dropdown menu


   // await message.channel.send({ embeds: [helpon], components: [row] })



/*
    const WrongFormat = new Discord.MessageEmbed()
        .setColor(`#ffffff`)
        .setTitle('Error')
        .setDescription(`Invalid arguments provided`)
        .addFields(
            { name: 'Staff role', value: '`,setup <on/off> staffrole <Mention the role>`', inline: false },
            { name: 'Mute Role', value: '`,setup <on/off> muterole <Mention the role>`', inline: false },
            { name: 'Blacklist role', value: '`,setup <on/off> blacklist <Mention the role>`', inline: false },
            { name: 'Suggest channel', value: '`,setup <on/off> suggest <Mention the channel>`', inline: false },
            { name: 'Report channel', value: '`,setup <on/off> report <Mention the channel>`', inline: false },
            { name: '⚠️DELETE ALL DATA⚠️', value: '`,setup deleteall`', inline: false },
        )
        .setColor("RED")
        .setFooter(`Asked by ${message.author.tag}`)
*/



    const works = new Discord.MessageEmbed()
        .setColor(`0x00FF00`)
        .setTitle(`Success!`)
        .setDescription(`Successfully saved ${args[1]} into the database`)
        .setFooter(`Asked by ${message.author.tag}`)

    const worksdelete = new Discord.MessageEmbed()
        .setColor(`0x00FF00`)
        .setTitle(`Successfully deleted`)
        .setDescription(`Successfully deleted ${args[1]} from the database`)
        .setFooter(`Asked by ${message.author.tag}`)

    const NoData = new Discord.MessageEmbed()
        .setTitle('Error!')
        .setDescription(`There is already no data for this command!`)
        .setColor("#ffffff")

        //the embed message for error handling and showing the user that it works


        

    //------------------------------------- error handling -------------------------------------

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

            //------------------------------------- start of command -------------------------------------\


            //format is 
            // if arguement 2 is a specific thing
            // defines the data it needs to save as something
            //error handing
            //saves the data

        } else {
            if (args[0] === "on") {
                if (args[1] === "staffrole") {
                    const staffrole = message.mentions.roles.first()
                    
                    if (!staffrole) { //error handling
                        message.channel.send("Please mention a role!")
                        await message.channel.send({ embeds: [helpon], components: [row] })
                    } 

                    const DataStaffRole = await setup.findOne({ GuildID: message.guild.id, StaffRoleID: staffrole.id })
                    
                    if (DataStaffRole) { //error handling
                        message.channel.send("You've already set up this command!")
                        await message.channel.send({ embeds: [helpon], components: [row] })
                    } else {
                        if (staffrole && !DataStaffRole && !data) { //if the user mentions a role, there is no data for staffrole, there is no data for guild
                            let newData = new setup({
                                GuildID: message.guild.id,
                                StaffRoleID: staffrole.id
                            });
                            newData.save(); //saves the data
                            return message.channel.send({ embeds: [works] });
                        } else if (data) {
                            await setup.updateOne({
                                GuildID: message.guild.id,
                                StaffRoleID: staffrole.id
                            }); //updates the data
                            return message.channel.send({ embeds: [works] });
                        } else {
                            return message.channel.send("there was an error")
                        }
                    }
                } else if (args[1] === "muterole") {
                    const muterole = message.mentions.roles.first()
                    
                    if (!muterole) {
                        message.channel.send("Please mention a role!")
                        await message.channel.send({ embeds: [helpon], components: [row] })
                    }

                    const DataMuteRole = await setup.findOne({ GuildID: message.guild.id, MuteRoleID: muterole.id })
                    
                    if (DataMuteRole) {
                        message.channel.send("You've already set up this command!")
                        await message.channel.send({ embeds: [helpon], components: [row] })
                    } else {
                        if (muterole && !DataMuteRole && !data) {
                            let newData = new setup({
                                GuildID: message.guild.id,
                                MuteRoleID: muterole.id
                            });
                            newData.save();
                            return message.channel.send({ embeds: [works] });
                        } else if (data) {
                            //let oldData = 
                            await setup.updateOne({
                                GuildID: message.guild.id,
                                MuteRoleID: muterole.id
                            });
                            //await oldData.save();
                            return message.channel.send({ embeds: [works] });
                        } else {
                            return message.channel.send("there was an error")
                        }
                    }


                } else if (args[1] === "blacklist") {//BlackListRoleID
                    const blackrole = message.mentions.roles.first()
                    
                    if (!blackrole) {
                        message.channel.send("Please mention a role!")
                        await message.channel.send({ embeds: [helpon], components: [row] })
                    } 

                    const DataBlackListRoleID = await setup.findOne({ GuildID: message.guild.id, BlackListRoleID: blackrole.id })
                    if (DataBlackListRoleID) {
                        message.channel.send("You've already set up this command!")
                        await message.channel.send({ embeds: [helpon], components: [row] });
                    } else {
                        if (blackrole && !DataBlackListRoleID && !data) {
                            let newData = new setup({
                                GuildID: message.guild.id,
                                BlackListRoleID: blackrole.id
                            });
                            newData.save();
                            return message.channel.send({ embeds: [works] });
                        } else if (data) {
                            await setup.updateOne({
                                GuildID: message.guild.id,
                                BlackListRoleID: blackrole.id
                            });
                            return message.channel.send({ embeds: [works] });
                        } else {
                            return message.channel.send("there was an error")
                        }
                    }
                } else if (args[1] === "suggest") {//SuggestChannelID
                    const SuggestionChannel = message.mentions.channels.first()
                    if (!SuggestionChannel) {
                        message.channel.send("Please mention a channel!")
                        await message.channel.send({ embeds: [helpon], components: [row] })
                    }

                    const DataSuggestChannelID = await setup.findOne({ GuildID: message.guild.id, SuggestChannelID: SuggestionChannel.id })

                    if (DataSuggestChannelID) {
                        message.channel.send("You've already set up this command!")
                        await message.channel.send({ embeds: [helpon], components: [row] })
                    } else {
                        if (SuggestionChannel && !DataSuggestChannelID && !data) {
                            let newData = new setup({
                                GuildID: message.guild.id,
                                SuggestChannelID: SuggestionChannel.id
                            });
                            newData.save();
                            return message.channel.send({ embeds: [works] });
                        } else if (data) {
                            await setup.updateOne({
                                GuildID: message.guild.id,
                                SuggestChannelID: SuggestionChannel.id
                            });
                            return message.channel.send({ embeds: [works] });
                        } else {
                            return message.channel.send("there was an error")
                        }
                    }
                } else if (args[1] === "report") {//ReportChannelID
                    const ReportChannel = message.mentions.channels.first()
                    
                    if (!ReportChannel) {
                        message.channel.send("Please mention a channel!")
                        await message.channel.send({ embeds: [helpon], components: [row] })
                    } 
                    
                    const DataReportChannel = await setup.findOne({ GuildID: message.guild.id, SuggestChannelID: ReportChannel.id })
                    
                    if (DataReportChannel) {
                        message.channel.send("You've already set up this command!")
                        await message.channel.send({ embeds: [helpon], components: [row] })
                    } else {
                        if (ReportChannel && !DataReportChannel && !data) {
                            let newData = new setup({
                                GuildID: message.guild.id,
                                ReportChannelID: ReportChannel.id
                            });
                            newData.save();
                            return message.channel.send({ embeds: [works] });
                        } else if (data) {
                            await setup.updateOne({
                                GuildID: message.guild.id,
                                ReportChannelID: ReportChannel.id
                            });
                            return message.channel.send({ embeds: [works] });
                        } else {
                            return message.channel.send("there was an error")
                        }
                    } 


                }  else if (args[1] === "design") {//Designs
                    console.log("")

                    const Datadesigns = await setup.findOne({ GuildID: message.guild.id, Designs: true})
                    
                    if (Datadesigns) {
                        message.channel.send("You've already set up this command!")
                        await message.channel.send({ embeds: [helpon], components: [row] })
                    } else {
                        if (!data) { //IF THERE IS NO DATA
                            let newData = new setup({
                                GuildID: message.guild.id,
                                Designs: true
                            });
                            newData.save();
                            return message.channel.send({ embeds: [works] });


                        } else if (data) {// IF THERE IS DATGA
                            await setup.updateOne({
                                GuildID: message.guild.id,
                                Designs: true
                            });

                            return message.channel.send({ embeds: [works] });

                        } else {
                            return message.channel.send("there was an error")
                        }
                    } 


                } 
                
                else {
                    await message.channel.send({ embeds: [helpon], components: [row] })
                }

                //------------------------------------- off -------------------------------------
            } else if (args[0] == "off") {

                async function func(a) {
                    let d = await setup.findOne({ GuildID: message.guild.id })
                    console.log(d[a])
                    if (d[a]) {
                        d[a] = undefined;
                        await d.save();
                        return message.channel.send({ embeds: [worksdelete] });
                    } else {
                        return message.channel.send({ embeds: [NoData] });
                    }
                }

                if (args[1] === "staffrole") {
                    func("StaffRoleID");
                } else if (args[1] === "muterole") {
                    func("MuteRoleID");
                } else if (args[1] === "blacklist") {
                    func("BlackListRoleID");
                } else if (args[1] === "suggest") {//SuggestChannelID
                    func("SuggestChannelID")
                } else if (args[1] === "report") {//ReportChannelID 
                    func("ReportChannelID")
                } else if (args[1] === "design") {
                    func("Designs")
                } else {
                    return message.channel.send({ embeds: [NoData] });
                }


            } else if (args[0] == "deleteall") {

                const dataa = await setup.findOne({ GuildID: message.guild.id })
                if (!dataa) {
                    return message.channel.send("There is no data to delete");
                } else if (dataa) {

                    const _DelData = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('DelData')
                            .setLabel('Yes')
                            .setStyle('DANGER'),
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId('NopeData')
                            .setLabel('No')
                            .setStyle('SECONDARY'),
                    );



                message.channel.send({ content: `Are you sure you want to **delete all data**`, components: [_DelData] })

                    //await setup.deleteMany({ GuildID: message.guild.id })
                   // return message.channel.send({ embeds: [worksdelete] })
                } else {
                    return message.channel.send("There was an error");
                }

            } else {
                await message.channel.send({ embeds: [helpon], components: [row] })
            }
        }

        client.on("interactionCreate", async (interaction) => {
            if (interaction.member.id !== message.author.id) return;

            if (interaction.isSelectMenu()) {
                if (interaction.values[0] == "off") {
                    await interaction.update({ embeds: [helpoff] })
                } else if (interaction.values[0] == "on") {
                    await interaction.update({ embeds: [helpon] })
                } else {
                    message.channel.send("There was a problem with the interactrion")
                } 

            } else if(interaction.isButton()){
                
                if (interaction.customId === 'DelData') {
                    await setup.deleteMany({ GuildID: message.guild.id })
                    await interaction.update({ content: 'Deleted all data!', components: [], embeds: [worksdelete] });


                } else if (interaction.customId === "NopeData") {
                    await interaction.update({ content: 'No action was taken', components: [] });
                } else {
                    return;
                }

            }
        })

    } catch (error) {
        message.channel.send(`There was an error: ${error}`)
        console.log(error)
    }
}




