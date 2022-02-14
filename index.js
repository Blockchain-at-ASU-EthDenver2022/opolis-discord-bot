// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
        if (interaction.commandName === 'contributorinfo') {
            const experienceTypeRow = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('experienceType')
                        .setPlaceholder('No experience type(s) selected')
                        .setMinValues(1)
                        .setMaxValues(3)
                        .addOptions([
                            {
                                label: 'Development',
                                value: 'dev',
                            },
                            {
                                label: 'Community',
                                value: 'community',
                            },
                            {
                                label: 'Marketing',
                                value: 'marketing',
                            },
                            {
                                label: 'Product',
                                value: 'product',
                            },
                            {
                                label: 'Ops',
                                value: 'ops',
                            },
                        ]),
                );
            const experienceTimeRow = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('experienceTime')
                        .setPlaceholder('No amount of experience selected')
                        .setMinValues(1)
                        .setMaxValues(1)
                        .addOptions([
                            {
                                label: 'Less than three months',
                                value: 'less3months',
                            },
                            {
                                label: 'Less than six months',
                                value: 'less6months',
                            },
                            {
                                label: 'Less than two years',
                                value: 'less2years',
                            },
                            {
                                label: 'Less than five years',
                                value: 'less5years',
                            },
                            {
                                label: 'Greater than five years',
                                value: 'greater5years',
                            },
                        ]),
                );
                const interestAreasRow = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('interestAreas')
                        .setPlaceholder('No interest area(s) selected')
                        .setMinValues(1)
                        .setMaxValues(5)
                        .addOptions([
                            {
                                label: 'DAOs',
                                value: 'daos',
                            },
                            {
                                label: 'DeFi',
                                value: 'defi',
                            },
                            {
                                label: 'NFTs',
                                value: 'nfts',
                            },
                            {
                                label: 'Public Goods',
                                value: 'publicgoods',
                            },
                            {
                                label: 'Art',
                                value: 'art',
                            },
                        ]),
                );

    
            const embed = new MessageEmbed().setTitle("Enter contributor information below")
            
            await interaction.reply({ embeds: [embed], components: [experienceTypeRow, experienceTimeRow, interestAreasRow] });
        }
    }

    if (interaction.isSelectMenu()) {
        if (interaction.customId === 'experienceType') {
            interaction.reply(bold("Experience type(s) updated"));
        } else if (interaction.customId === 'experienceTime') {
            interaction.reply(bold("Experience time updated"));
        } else if (interaction.customId === 'interestAreas') {
            interaction.reply(bold("Interest areas(s) updated"))
        }
    }
});

// Login to Discord with your client's token
client.login(token);