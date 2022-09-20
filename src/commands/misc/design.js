const Discord = require("discord.js")
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageCollector, MessageEmbed } = require('discord.js');
const setup = require('../../models/setup')

module.exports.config = {
    name: "design",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    const Datadesigns = await setup.findOne({ GuildID: message.guild.id, Designs: true}) //tries to find the data in the setup model

    if(!Datadesigns) return message.channel.send("Please (ask the owner to) set up this command using the `,setup` command") //if there is no design data

    const filter = (m) => m.author.id == message.author.id; //filters it so only the bot colects

    const questions = [
        "What type of design would you like? (logo/banner/thumbnail/gif)",
        "What name do you want on the designs? (example: dragz)",
        "What colours or background do you want in your design (example: I want a black and blue background)",
        "Is there any other information that you want us to know? (if none, type 'n/a' or 'none')"
    ] //the questions

    let counter = 0;

    const collector = new MessageCollector(message.channel, {
        filter,
        time: 1000 * 300, //5 mins
        max: 4,
        errors: ['time'],
    }); //puts a filter, time and max amount of entries
    
    message.channel.send("You have 5 mins to answer these questions")
    message.channel.send(questions[counter++]) //incriments the counter by 1 per question

    collector.on('collect', (m) => {
        //m.content 
        if (counter < questions.length) {
            m.channel.send(questions[counter++])
        } //sending the questions
    });

    collector.on('end', (col) => {

        if (col.size < questions.length) { //if the user didn't answer the questions intime
            message.reply(`You didn't answer the questoins in the given time frame!`)
        }

        let count = 0;
        const embed = new Discord.MessageEmbed()
            .setTitle(`New request!`)
            .setDescription(`**Clients username:** ${message.author.tag} \n `)
            .setColor("RANDOM")
            .setTimestamp()
            //.setFooter(`Thanks for requesting at ${message.guild.name}`)
            .setFooter(`Estimated time of delivery is 2-7 days. If you would to speed this up you may need to pay or invite more people. (2 invites per day shaved of delivery time)`)

        col.forEach((value) => {
            embed.addField(`${questions[count++]}:`, `${value.content}`, false)
        }) //for each value it creates a new field and and displays the questoin and answer

        message.channel.send({ embeds: [embed] })
    })

}


