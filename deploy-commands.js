const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { CLIENT_ID, TEST_GUILD_ID, TOKEN, PRODUCTION } = require('./config.json');

if (TOKEN === "ENTERTOKENHERE" || CLIENT_ID === "ENTERCLIENTIDHERE") {
	throw new Error("config.json does not contain a valid TOKEN and CLIENT_ID");
}

const commands = [
	new SlashCommandBuilder()
		.setName('contributorinfo')
		.setDescription('Adds contributor info to server database'),
	new SlashCommandBuilder()
		.setName('contributordescription')
		.setDescription('Adds contributor description to database')
		.addStringOption(option =>
			option.setName('description')
				.setDescription('The contributor description')
				.setRequired(true)),
	new SlashCommandBuilder()
		.setName('projectinfo')
		.setDescription('Adds project info to server database'),
	new SlashCommandBuilder()
		.setName('projectdescription')
		.setDescription('Adds project description to database')
		.addStringOption(option =>
			option.setName('description')
				.setDescription('The project description')
				.setRequired(true)),
	new SlashCommandBuilder()
		.setName('search')
		.setDescription('Searches suitable projects based on contributor info'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(TOKEN);

if (PRODUCTION) {
	//Production Mode
	rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
} else {
	//Test Mode (Single Test Server)
	rest.put(Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
}