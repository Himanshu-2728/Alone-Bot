const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const prefixes = require('../Data/prefixes.json')
let days = {
    1: 'Sun',
    2: 'Mon',
    3: 'Tue',
    4: 'Wed',
    5: 'Thu',
    6: 'Fri',
    7: 'Sat',

}

module.exports = {
    name: 'Prefix',
    category: 'admin',
    description: 'Sets the server prefix to the given value',
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setName('prefix')
        .setDescription('Create or change the prefix for guild')
        .addStringOption(option => option
            .setName('prefix')
            .setDescription('Enter the prefix')
            .setMaxLength(10)
            .setRequired(true)
            ),
    callBack: async(interaction) => {
        let prefix = interaction.options.get('prefix').value
        let date  = new Date() 
        let time = `${Math.round(date.getHours()/3)}:${Math.round(date.getMinutes())} , ${days[date.getDay()]} ${date.getMonth()}`

        let em = new EmbedBuilder()
            .setTitle('Prefix Update')
            .setDescription('Prefix has been updated')
            .addFields(
                {
                    name: `Changed To:`,
                    value: prefix
                },
                {
                    name: 'Changed By:',
                    value: `${interaction.user.username}`
                },
                {
                    name: 'Changed At:',
                    value: time
                }

            )
            .setFooter({text: `New Prefix: ${prefix}` , iconURL: interaction.user.avatarURL()})
        let guildId = interaction.guild.id
        prefixes[guildId] = prefix
        interaction.reply({embeds: [em]})
    }
}