const Discord = require("discord.js")

module.exports.config = {
	name: "info",
	aliases: []
}

module.exports.run = async (client, message, args) => {
	const config = require('../../../config.json');
	if (message.author.id !== config.ownerID) return;

	const { MessageEmbed } = require('discord.js');

	const exampleEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Approx.Designs')
		.setDescription('Approx.Designs formerly known as JKC Studios, have been making designs, animations, discord bots and websites for our customers since 2019. After some unforeseen circumstances we had to restart the community. Here we will bring you logos, banners, animations and more!')
		.addFields(
			{ name: 'ㅤ', value: '**__Prices:__**', inline: false },
			{ name: 'Logos', value: '2 invites', inline: true },
			{ name: 'Banners/Thumbnails', value: '3 invites', inline: true },
			{ name: 'Gifs/Animations', value: '4 invites', inline: true },
		)

	message.channel.send({ embeds: [exampleEmbed] });
}

//send specific message for a specific bot
//private command, only the owner can access it