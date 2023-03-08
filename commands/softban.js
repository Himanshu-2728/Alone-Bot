const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: 'softban',
    data: new SlashCommandBuilder()
        .setName('softban')
        .setDescription('Bans a user for a specific time')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option
            .setName('user')
            .setDescription('the user you would like to ban')
            .setRequired(true)
        )
        .addIntegerOption(option => option
            .setRequired(true)
            .setName('duration')
            .setDescription('Select the duration')
            .addChoices(
                {
                    name: '1 Min',
                    value: 60
                },
                {
                    name: '5 Mins',
                    value: 300
                },
                {
                    name: '30 Min',
                    value: 1800
                },
                {
                    name: '1 Hour',
                    value: 3600
                },
                {
                    name: '24 Hour',
                    value: 86400
                }
            )
            )
        .addStringOption(option => option
            .setName('reason')
            .setDescription('The reason for banning the user')
            )
        ,
            
    callBack: async(interction) => {
        // Leaving here just for now
        console.log('interaction triggered')
    }
}