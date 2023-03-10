const { SlashCommandBuilder, messageLink } = require('discord.js');

module.exports = {
    name: "ping",
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Provides the latency'),
    
    callBack: async(interaction) =>{
        console.log(interaction.createdTimestamp)
        interaction.reply({content: 'Calculating' , ephemeral: true}).then(res => {
            let ping = Date.now() - interaction.createdTimestamp
            interaction.editReply({content: `Calculated, After ${ping} ms` , ephemeral: true})
        })
    }
}
