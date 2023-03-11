const { SlashCommandBuilder , EmbedBuilder, Embed } = require('discord.js')

module.exports = {
    name: 'Avatar',
    description: 'Sends the avatar of a user',
    category: "fun",
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar of the requested user')
        .addUserOption(option => option
            .setName('user')
            .setDescription('Select the user')
            .setRequired(true)),

    callBack: async(interaction) => {
        const av = await  interaction.options.get('user').user.avatarURL({size: 1024})
        const embed = new EmbedBuilder()
            .setImage(av , 1024 , 1024)
            .setTitle(`${interaction.options.get('user').user.username}`)
            .setDescription('Avatar')
            .setFooter({text: `Request by ${interaction.user.username}` ,  iconURL: interaction.user.avatarURL()})
        console.log(av)
        await interaction.reply({embeds: [embed]})
    }
}