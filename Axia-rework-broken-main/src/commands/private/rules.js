const Discord = require("discord.js")

module.exports.config = {
    name: "rules",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    const config = require('../../../config.json');
    if (message.author.id !== config.ownerID) return;


    const { MessageEmbed } = require('discord.js');

    const exampleEmbed = new MessageEmbed()


        .setColor('#0099ff')
        .setTitle('Rules')
        .setDescription("**1.** Follow Discord Community Guidelines\n **2.** No racism, sexism or other abusive language that is degrading another person\n **3.** Do NOT misuse spoilers by making it look like you're swearing\n **4.** No NSFW or obscene content. This includes text, images, or links featuring nudity, sex, hard violence, or other graphically disturbing content.\n **5.** No self-promo")

        message.channel.send({ embeds: [exampleEmbed] });
}


//send specific message for a specific bot
//private command, only the owner can access it

