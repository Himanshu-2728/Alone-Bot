const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "ping",
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('this is description about this command'),
    
    callBack: async(interaction) =>{
        
        interaction.reply(`Pong🎈`)
    }

    
}