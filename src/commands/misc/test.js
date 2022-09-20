const {
    Discord,
    MessageActionRow,
    MessageSelectMenu,
    MessageButton,
    MessageCollector,
    MessageEmbed
} = require('discord.js');
const wait = require('util').promisify(setTimeout);


module.exports.config = {
    name: "test",
    aliases: []
}

module.exports.run = async (client, message, args) => {

    const filter = (m) => m.author.id == message.author.id; //filters it so only the bot colects the author's messages

    const collector = new MessageCollector(message.channel, {
        filter,
        time: 1000 * 300, //5 mins
        max: 4,
        errors: ['time'],
    }); //puts a filter, time and max amount of entries
    

    collector.on('collect', (msg) => {
        console.log(msg.content);
    });

    collector.on('end', (col) => {
        if(col.size === 0){
            return message.channel.send("No messages colleced!")
        }
    })

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