const { Client , Routes , GatewayIntentBits  , REST , Events, Collection, InteractionWebhook, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, escapeMarkdown, InteractionCollector, AuditLogOptionsType} = require('discord.js')
const { token , clientId , guildId } = require('./config.json')
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildMessages
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



client.on('interactionCreate' , async (interaction) =>{
	if(!interaction.isChatInputCommand()) return;

	const command = callbacks.get(interaction.commandName)(interaction)


})

client.login(token)
