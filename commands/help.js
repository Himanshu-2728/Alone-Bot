const { SlashCommandBuilder , StringSelectMenuBuilder  , ActionRowBuilder , StringSelectMenuOptionBuilder,  EmbedBuilder, Collection } = require('discord.js')
const fs = require('fs')



let commandDescDict = {
    Mod: new Collection(),
    Fun: new Collection(),
    Gen: new Collection(),
    Admin: new Collection(),
    Prog: new Collection()
}

let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js') && file != 'help.js')
let chatCommandFiles = fs.readdirSync('./chatCommands').filter(file => file.endsWith('.js') && file != 'help.js')

for(const file of commandFiles){
    let command = require(`./${file}`)
    if(command.category === 'mod'){
        commandDescDict.Mod.set(command.name , command.description)

    }else if(command.category === 'fun'){
        commandDescDict.Fun.set(command.name , command.description)

    }else if(command.category === 'admin'){
        commandDescDict.Admin.set(command.name , command.description)

    }else if(command.category === 'gen'){
        commandDescDict.Gen.set(command.name , command.description)

    }else if(command.category === 'pgmg'){
        commandDescDict.Prog.set(command.name , command.description)

    }
}
for(const file of chatCommandFiles){
    let command = require(`../chatCommands/${file}`)
    if(command.category === 'mod'){
        commandDescDict.Mod.set(command.name , command.description)

    }else if(command.category === 'fun'){
        commandDescDict.Fun.set(command.name , command.description)

    }else if(command.category === 'admin'){
        commandDescDict.Admin.set(command.name , command.description)

    }else if(command.category === 'gen'){
        commandDescDict.Gen.set(command.name , command.description)

    }else if(command.category === 'pgmg'){
        commandDescDict.Prog.set(command.name , command.description)

    }
}



module.exports = {
    name: 'Help',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides some useful information about some commands'),
    callBack: async(interaction) => {
        let basicembed = new EmbedBuilder()
            .setTitle('Help Command')
            .setDescription('The commands from the category you selected will appera here')
        let selectMenu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setPlaceholder('No Category selected')
                    .setCustomId('categorySelector')
                    .setMaxValues(1)
                    .setOptions([
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Fun')
                            .setDescription('Some Fun Commands')
                            .setDefault(false)
                            .setEmoji('🎉')
                            .setValue('Fun'),

                        new StringSelectMenuOptionBuilder()
                            .setLabel('Moderation')
                            .setDescription('Moderation related Commands')
                            .setDefault(false)
                            .setEmoji('Ⓜ')
                            .setValue('Mod'),

                        new StringSelectMenuOptionBuilder()
                            .setLabel('Admin')
                            .setDescription('Administrator Commands')
                            .setDefault(false)
                            .setEmoji('🅰')
                            .setValue('Admin'),

                        new StringSelectMenuOptionBuilder()
                            .setLabel('Utitlities')
                            .setDescription('Utitlity  Commands')
                            .setDefault(false)
                            .setEmoji('🛠')
                            .setValue('Gen'),

                        new StringSelectMenuOptionBuilder()
                            .setLabel('Programming')
                            .setDescription('Programming related commands Commands')
                            .setDefault(false)
                            .setEmoji('💻')
                            .setValue('Prog')
                          
                       
                    ])
            )
        let msg = await interaction.reply({embeds: [basicembed] ,components: [selectMenu]})    
        let filter = (int) => int.customId === 'categorySelector'
        let collecter = interaction.channel.createMessageComponentCollector({filter: filter})
        
        // Collect the value and edit the embed accordingly

        collecter.on('collect' , async(int)=>{
            let category = int.values[0]
            let arr = []
           
            for(const command of commandDescDict[category]){
                let nvDict = {}
                nvDict.name = command[0]
                nvDict.value = command[1]
                arr.push(nvDict)
            }

            let em = new EmbedBuilder()
                .setTitle(`Command Info`)
                .setDescription('The commands from the category you selected will appear here')
                .addFields(arr)
            
            await interaction.editReply({embeds: [em] , components: [selectMenu]})
        })
    }
    
}