const { Client , Routes , GatewayIntentBits  , REST, Collection} = require('discord.js')
const { token , clientId , guildId } = require('./config.json')
const fs = require('fs');
const Prefixes = require('./Data/prefixes.json')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
    ]}
);


client.on('ready' , ()=>{
	console.log('ready')
	client.user.setStatus('dnd')
})
let commands = []
const callbacks = new Collection()
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for( const file of commandFiles){
	const command = require(`./commands/${file}`);
	commands.push(command.data)
	callbacks.set(command.name , command.callBack)
}

let chatcommands = new Collection()
const chatCommandFile = fs.readdirSync('./chatCommands').filter((file) => file.endsWith('.js'));
for(const file of chatCommandFile){
	const command = require(`./chatCommands/${file}`)
	chatcommands.set(command.name , command.callBack)
};

const rest = new REST({ version: '10' }).setToken(token);


(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error)
	}
})();

client.on('messageCreate' , async(message) => {
	if(message.author.bot) return;
	let guildId = message.guild.id
	if(!Prefixes[guildId]) console.log('Prefix not present')

	if(!message.content.startsWith(Prefixes[guildId])) return
	else{
		const content = message.content.split(' ')
		const command = content[0].replace(Prefixes[guildId],  "")
		content.shift()
		const args = content

		chatcommands.get(command.toLowerCase())(message , args)
	}

})

client.on('interactionCreate' , async (interaction) =>{
	if(!interaction.isChatInputCommand()) return;

	const command = callbacks.get(interaction.commandName)(interaction)


})

client.login(token)
