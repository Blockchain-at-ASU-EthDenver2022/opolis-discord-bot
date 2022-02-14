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

    
            const embed = new MessageEmbed().setTitle('Enter contributor information below')
            
            interaction.reply({ embeds: [embed], components: [experienceTypeRow, experienceTimeRow, interestAreasRow] });
        
        } else if (interaction.commandName === 'projectinfo') {
            const rolesNeededRow = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('rolesNeeded')
                        .setPlaceholder('No needed role(s) selected')
                        .setMinValues(1)
                        .setMaxValues(5)
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
            const experienceTimeRequiredRow = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('experienceTimeRequired')
                        .setPlaceholder('No amount(s) of experience selected')
                        .setMinValues(1)
                        .setMaxValues(5)
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
            const interestTypeRow = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('projectType')
                        .setPlaceholder('No project type(s) selected')
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

    
            const embed = new MessageEmbed().setTitle('Enter project information below')
            
            interaction.reply({ embeds: [embed], components: [rolesNeededRow, experienceTimeRequiredRow, interestTypeRow] });
        
        } else if (interaction.commandName === 'contributordescription') {
            //TODO: Set description in database
            interaction.reply(bold('Set contributor description to:\n') + `${interaction.options.getString('description')}`);
        } else if (interaction.commandName === 'projectdescription') {
            //TODO: Set description in database
            interaction.reply(bold('Set project description to:\n') + `${interaction.options.getString('description')}`);
        } else if (interaction.commandName === 'search') {
            //TODO: Implement search functionality
        }


    }

    if (interaction.isSelectMenu()) {
        //TODO: When menu values are changed update database

        if (interaction.customId === 'experienceType') {
            interaction.reply(bold('Experience type(s) updated'));
        } else if (interaction.customId === 'experienceTime') {
            interaction.reply(bold('Experience time updated'));
        } else if (interaction.customId === 'interestAreas') {
            interaction.reply(bold('Interest areas(s) updated'));
        } else if (interaction.customId === 'rolesNeeded') {
            interaction.reply(bold('Role(s) needed updated'));
        } else if (interaction.customId === 'experienceTimeRequired') {
            interaction.reply(bold('Experience requirements updated'));
        } else if (interaction.customId === 'projectType') {
            interaction.reply(bold('Project type(s) updatede'));
        }
    }
});

// Login to Discord with your client's token
client.login(token);