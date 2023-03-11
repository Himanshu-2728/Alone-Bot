const { SlashCommandBuilder  , PermissionsBitField , ActionRowBuilder  , InteractionCollector , ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: 'Ban',
    description: 'Bans the specifies user',
    category: 'mod',
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionsBitField.StageModerator)
        .setName('ban')
        .setDescription('Bans a user from the guild')
        .addUserOption(option => option
            .setRequired(true)
            .setName('user')
            .setDescription('Choose the user you want to ban')
            )
        .addStringOption(option => option
            .setRequired(true)
            .setName('reason')
            .setDescription('Provide a valid reason for the ban of the user')
            )

        ,
    
    callBack: async(interaction) => {
        let user = interaction.guild.members.cache.get(interaction.options.get('user').value)
        let reason = interaction.options.get('reason').value
        let commandExecuter = interaction.user
        if(user.bannable){
            
            
            interaction.reply({content:'The user is banned' , ephemeral: true})
            interaction.guild.bans.create(user , {reason: reason}) 
            
            

        }else if(user.bannable === false){
            interaction.reply({content: 'The user is not bannable' , ephemeral: true})
        }
    }            
}