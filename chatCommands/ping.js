module.exports = {
    name: 'ping',
    callBack: (message , args) => {
        message.channel.send('Pong')
    }
}