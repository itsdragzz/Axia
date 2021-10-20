/*
const Discord = require("discord.js");

exports.info = {
    aliases: ["help"]
}

exports.run = async (client, message, args) => {
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);

    if (!helpArgs[0]) {
        var embed = new Discord.MessageEmbed()
            .setColor('#00A4FF')
            .setTitle(`<a:bluespinningcircle:745574682509705268> Axia's commands list`)
            .setDescription(`[Add Axia](https://discord.com/oauth2/authorize?client_id=736773729454915604&scope=bot&permissions=2080767217) | [Join our support server](https://discord.gg/waKFNtD)`)
            .addFields(
                { name: '**Fun commands**', value: '\`8ball\`, \`image\`, \`embed\`, \`weather\`, \`calculate\`, \`meme\`, \`howgay\`, \`simp\`, \`trivia\`, \`rps\`, \`pepe\`, \`poll\`, \`owoify\`, \`covid\`', inline: false },
                { name: '**Moderation commands**', value: '\`clear\`, \`slowmode\`, \`kick\`, \`ban\`, \`unban\`, \`warn\`, \`removewarn\`, \`warns\`, \`mute\`, \`unmute\`, \`report\`', inline: false },
                { name: '**Utility commands**', value: '\`id\`, \`ping\`, \`whois\`, \`serverinfo\`, \`botinfo\`, \`suggest\`, \`inviteleaderboard\`', inline: false },
                { name: '**Config commands**', value: '\`mute\`, \`report\`, \`suggest\`, \`setup\`', inline: false },
                { name: '**Animal commands**', value: '\`dog\`, \`cat\`, \`animals\`, \`snek\`, \`bird\`, \`tiger\`, \`panda\`', inline: false },
                { name: '**Economy commands**', value: '\`bal\`, \`daily\`, \`trivia\`, \`rps\`', inline: false },
            )
            .setFooter(`Type ,help [cmd] to get infomaiton on a specific command!`)
        message.channel.send(embed);
    }

    if (helpArgs[0]) {
        let command = helpArgs[0];

        if (client.commands.has(command)) {

            command = client.commands.get(command);
            var embed = new Discord.MessageEmbed()
                .setTitle(`${command.config.name} Command`)
                .setDescription(`${command.config.description || "There is no Description for this command."}`)
                .addFields(
                    { name: '**Usage:** ', value: `\`${command.config.usage || "No Usage"}\``, inline: false },
                    { name: '**Permissions:** ', value: `\`${command.config.accessableby || "Members"}\``, inline: false },
                    { name: '**Aliases:** ', value: `\`${command.config.aliases || "No Aliases"}\``, inline: false },
                )
                .setColor('#00A4FF')

            message.channel.send(embed);
        }
    }
}

module.exports.config = {
    category: 'info',
    name: "Help",
    description: "",
    usage: ",help",
    accessableby: "Members",
    aliases: ["None"]
}
*/
const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../../config.json").prefix;


const Discord = require("discord.js")

module.exports.config = {
    name: "help",
    aliases: []
}

module.exports.run = async (client, message, args) => {

}







