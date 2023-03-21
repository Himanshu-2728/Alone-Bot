const  { bannedWord } = require('../config.json')

function func(message){
    let content = message.content
    for(const i of bannedWord){
        let a = content.match(i)
        if(a){
            message.delete()
            message.channel.send(`This word is banend in this channel`)
        }
    }
}


module.exports = func