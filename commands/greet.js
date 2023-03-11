const { SlashCommandBuilder, User } = require('discord.js')

module.exports = {
    name: 'Greet',
    description: 'Sends a greet to the specified user',
    category: 'fun',
    data: new SlashCommandBuilder()
        .setName('greet')
        .setDescription('Greets the specified user')
        .addUserOption(option => option
            .setName('user')
            .setDescription('Select the user you want to greet')
        )
        .addStringOption(option => option
            .setName('greet')
            .setDescription('Select your Greet')
            .setChoices({
                name: 'Good Morning',
                value: 'Morning'
            },
            {
                name: 'Good Night',
                value: 'Night'
            },
            {
                name: 'Good Evening',
                value: 'Evening'
            }
            )
        ),

    callBack: async(interaction) => {
        const greet = interaction.options.get('greet')
        interaction.reply(`Hey! <@${interaction.options.get('user').user.id}> Good ${greet.value} from <@${interaction.user.id}> `)
    }
}