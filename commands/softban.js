const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')



module.exports = {
    name: 'tempban',
    category: 'mod',
    description: 'Bans the specified user for the time',
    data: new SlashCommandBuilder()
        .setName('tempban')
        .setDescription('Bans a user for a specific time')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option
            .setName('user')
            .setDescription('the user you would like to ban')
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName('duration')
            .setDescription('Select the duration')
            .setChoices(
                {
                    name: '1 Min',
                    value: 1
                },
                {
                    name: '5 Mins',
                    value: 5
                },
                {
                    name: '30 Min',
                    value: 30
                },
                {
                    name: '1 Hour',
                    value: 60
                },
                {
                    name: '24 Hour',
                    value: 60*24
                }
            )
            )
        .addStringOption(option => option
            .setName('reason')
            .setDescription('The reason for banning the user')
            )
        
        ,
        
            
    callBack: async(interaction) => {
        // Leaving here just for now
        console.log('interaction triggered')
        let user = interaction.guild.members.cache.get(interaction.options.get('user').value)
        let duration = parseInt(interaction.options.get('duration').value)
        if(user.bannable){
            interaction.guild.bans.create(user , {reason: `softban for ${duration} minutes`})
            interaction.reply({content: `The user is banned for ${duration} minutes` , ephemeral: true})
        }else if(!user.bannable){
            interaction.reply({content: 'The user is not bannable' , ephemeral: true})
        }
        setTimeout(()=>{
            console.log('function started')
            interaction.guild.bans.remove(user , {reason: 'softban removed'})

        } , duration * 60000)

    }
}