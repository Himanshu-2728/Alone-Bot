const { SlashCommandBuilder , PermissionsBitField } = require('discord.js')

module.exports = {
    name: 'Kick',
    description: 'Kicks the specified user',
    category: 'mod',
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionsBitField.StageModerator)
        .setName('kick')
        .setDescription('kicks the mentioned user from the server')
        .addUserOption(option => option
            .setRequired(true)
            .setName('user')
            .setDescription('select the user you want to kick')
            )
        .addStringOption(option => option
            .setName('reason')
            .setDescription('enter the reason why you are kicking the user')
            .setRequired(true)
            ),

    callBack: async(interaction) => {
        let user = interaction.guild.members.cache.get(interaction.options.get('user').value)
        let reason = interaction.options.get('reason').value
        if(user.kickable){
            user.kick(reason)
            interaction.reply('The user has been kicked')
        }else if(!user.kickable){
            interaction.reply('I cannot kick the user')
        }
    }
}