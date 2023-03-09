const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "ping",
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with Pong🎈'),
    
    callBack: async(interaction) =>{
        
        interaction.reply(`Pong🎈`)
    }

    
}
