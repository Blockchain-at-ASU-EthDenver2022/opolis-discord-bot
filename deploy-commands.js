const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

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

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);