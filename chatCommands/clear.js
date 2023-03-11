
module.exports = {
    name: 'clear',
    description: 'Clears the amount of messages',
    category: 'mod',
    callBack: async(message, args) => {
        let amount  = Number(args[0])
        console.log(amount)
        if (!args[0]) {
            await message.channel.send("```Invalid Arguments\nCorrect Usage: <clear> <amount: int> ```")
        }else if(isNaN(amount)){
            await message.channel.send("```Invalid Argument Type\n<amount> Must be a Number```")

        }else if(!isNaN(amount)){
            const messages = await message.channel.messages.fetch({limit: Number(amount) + 1 })
            await message.channel.bulkDelete(messages)
        }
        
    }
}