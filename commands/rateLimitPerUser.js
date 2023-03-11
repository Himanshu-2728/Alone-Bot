const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: 'setratelimitperuser',
    category: 'mod',
    description: 'Helps to set the rate limit of the channel',
    data: new SlashCommandBuilder()
        .setName('setratelimitperuser')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDescription('Manage the amount of message sent in one second')
        .addNumberOption(option => option
            .setName('limit')
            .setDescription('amount of messages')
            .setRequired(true)
            )
        .addStringOption(option => option
            .setName('reason')
            .setDescription('reason')
            ),    

    callBack: async(interaction) => {
        let limit = interaction.options.get('limit').value
        try{
            let reason = interaction.options.get('reason').value
            await interaction.channel.setRateLimitPerUser(limit , reason)
            await interaction.reply({content: `${(limit === 0)? 'There is note limit for sending messages now' : `Users can send 1 message per ${limit} seconds`}` , ephemeral: true})

        }catch{
            let reason = 'No reason'
            await interaction.channel.setRateLimitPerUser(limit , reason)
            await interaction.reply({content: `${(limit === 0)? 'There is note limit for sending messages now' : `Users can send 1 message per ${limit} seconds`}` , ephemeral: true})

        }
    }
}