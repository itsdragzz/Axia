const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    const ping = Date.now() - message.createdTimestamp + " ms";
    const msg = await message.channel.send('Pinging...');
    setTimeout(() => {
        msg.edit(`Pong! My ping is ${ping}`);
    }, 10); //edits the messaage after 10ms

}

module.exports.config = {
    name: "ping",
    aliases: []
}


