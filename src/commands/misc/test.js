const Discord = require("discord.js")
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageCollector } = require('discord.js');
const readline = require("readline")

module.exports.config = {
    name: "test",
    aliases: []
}

/**
 * 
 * @param {*} client 
 * @param {*} message 
 * @param {*} args 
 * @returns 
 */

module.exports.run = async (client, message, args) => {

    
    const filter = (m) => m.author.id == message.author.id;
    console.log(filter)
    console.log(message.author.id)

   // message.channel.send("input shit")
    //const msgs = await message.channel.awaitMessages(filter, {time: 5000})
    //console.log(msgs.size)
    const collector = new MessageCollector(message.channel, filter, {
        time: 1000 * 5,
        max: 1,
        errors: ['time'],
    });

    collector.on('collect', (msg) => {
        console.log(msg.content);
    });

    collector.on('end', (col) => {
        if(col.size === 0){
            return message.channel.send("No messages colleced!")
        }
    })


    /*
    message.channel.awaitMessages(filter, {max: 1, time: 5000, errors: ['time']})
    .then((collected) => {
        console.log("works?")
        message.channel.send(collected.size);
        const msg = collected.first();
        message.channel.send(msg.content)
    })
    .catch((err) => console.log(err))
    */

    /*
    let filter = m => m.author.id === message.author.id

    
    message.channel.send(`input shit`).then(() => {
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 1000,
            errors: ['time']
        })
            .then(message => {

                console.log("works")
                message = message.first()
                if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
                    message.channel.send(`Deleted`)
                } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
                    message.channel.send(`Terminated`)
                } else {
                    message.channel.send(`Terminated: Invalid Response`)
                }

                //console.log("works")
                //  message.channel.send(message.content);


            })
            .catch(() => {
                message.reply('No answer after 5 seconds, operation canceled.');
            });
    })


    */



    /*
        message.channel.send("Input message:")

    let filter = m => m.id === message.author.id
    const channel = message.channel;
    const collector = channel.createMessageCollector(filter, { time: 10000 });
    collector.on('collect', m => message.channel.send(`Collected ${m.content}`));
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    */


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