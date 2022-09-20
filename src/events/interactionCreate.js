const Discord = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = async (client, interaction) => {
	
    console.log(interaction.channel.name);


    if (interaction.isButton()){

        //if (interaction.member.id !== message.author.id) return;
    	
    
        // console.log('cc')
        // await interaction.deferUpdate();
    
        // if (interaction.customId === 'DelData') {
        //     console.log('aa')
        //     await interaction.editReply({ content: 'Deleted all data!', components: [] });
        // } else if (interaction.customId === 'NopeData') {
        //     console.log('bb')
        //     await interaction.editReply({ content: 'No action was taken', components: [] });
        // }

    } 








    
    // const command = client.slash.get(interaction.commandName);
    // if (!command) return interaction.reply({ content: 'an Erorr' });

    // const args = [];
    
    // const guildId = '894516357004165160';

    // for (let option of interaction.options.data) {
    //     if (option.type === 'SUB_COMMAND') {
    //         if (option.name) args.push(option.name);
    //         option.options?.forEach(x => {
    //             if (x.value) args.push(x.value);
    //         });
    //     } else if (option.value) args.push(option.value);
    // }

    // try {

    //     command.run(client, interaction, args)

        
    // } catch (e) {
    //     interaction.reply({ content: e.message });
    // }

    //----------------------------------------------------------------------------------

    // if (interaction.isCommand()) {
    //     await interaction.defer({ ephemeral: false }).catch(() => { });

    //     const cmd = client.slashCommand.get(interaction.commandName);
    //     if (!cmd)
    //         return interaction.followup({ content: "There was an error" })

    //     const args = [];
    //     interaction.options.array().map((x) => {
    //         if (x.value) args.push(x.value);
    //         if (x.name) args.push(x.name)
    //     });

    //     cmd.run(client, interaction, args)
    // }



    

}

