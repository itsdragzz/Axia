const Discord = require("discord.js")

module.exports.config = {
    name: "test2",
    aliases: []
}

module.exports.run = async (client, message, args) => {

message.channel.delete();

}