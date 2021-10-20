const Discord = require("discord.js")
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports.config = {
    name: "test",
    aliases: []
}

module.exports.run = async (client, message, args) => {

 message.channel.send({content: `test command`})
 
}




/*
//defult command setup is

const Discord = require("discord.js")

module.exports.config = {
    name: "",
    aliases: []
}

module.exports.run = async (client, message, args) => {

    //code here

}
*/