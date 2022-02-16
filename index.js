const Sequelize = require('sequelize');
const { Client, Intents, MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');
const { token } = require('./config.json');

// Create server instance
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const contributors = sequelize.define('contributors', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	description: {
        type: Sequelize.TEXT,
        defaultValue: "",
    },
    devExperience: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    communityExperience: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    marketingExperience: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    productExperience: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    opsExperience: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel1: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel2: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel3: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel4: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel5: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    daoInterest: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    defiInterest: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    nftInterest: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    publicGoodsInterest: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    artInterest: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
});

const projects = sequelize.define('projects', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
    description: {
        type: Sequelize.TEXT,
        defaultValue: "",
    },
    devRole: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    communityRole: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    marketingRole: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    productRole: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    opsRole: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel1: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel2: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel3: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel4: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    experienceLevel5: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    daoType: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    defiType: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    nftType: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    publicGoodsType: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
    artType: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
    },
});

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    contributors.sync();
    projects.sync();
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

            const contributorExists = await contributors.findOne({ where: { id: interaction.member.user.id } });
            
            if (!contributorExists) {
                const newContributor = await contributors.create({
                    id: interaction.member.user.id,
                });
                console.log(`Added new contributor: ${interaction.member.user.id}`);
            } else {
                await contributors.destroy({ where: { id: interaction.member.user.id } });
                const newContributor = await contributors.create({
                    id: interaction.member.user.id,
                });
                console.log(`Reset contributor data: ${interaction.member.user.id}`);
            }

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
            const projectTypeRow = new MessageActionRow()
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

            const projectExists = await projects.findOne({ where: { id: interaction.member.user.id } });
            
            if (!projectExists) {
                const newProject = await projects.create({
                    id: interaction.member.user.id,
                });
                console.log(`Added new project: ${interaction.member.user.id}`);
            } else {
                await projects.destroy({ where: { id: interaction.member.user.id } });
                const newProject = await projects.create({
                    id: interaction.member.user.id,
                });
                console.log(`Reset project data: ${interaction.member.user.id}`);
            }

            const embed = new MessageEmbed().setTitle('Enter project information below')
            
            interaction.reply({ embeds: [embed], components: [rolesNeededRow, experienceTimeRequiredRow, projectTypeRow] });
        
        } else if (interaction.commandName === 'contributordescription') {
            const contributorExists = await contributors.findOne({ where: { id: interaction.member.user.id } });
            
            if (!contributorExists) {
                await contributors.create({
                    id: interaction.member.user.id,
                });
                console.log(`Added new contributor: ${interaction.member.user.id}`);
            }

            await contributors.update({ description: interaction.options.getString('description')}, { where: { id: interaction.member.user.id } });
            
            interaction.reply(bold('Set contributor description to:\n') + `${interaction.options.getString('description')}`);
        
        } else if (interaction.commandName === 'projectdescription') {
            const projectExists = await projects.findOne({ where: { id: interaction.member.user.id } });
            
            if (!projectExists) {
                await projects.create({
                    id: interaction.member.user.id,
                });
                console.log(`Added new project: ${interaction.member.user.id}`);
            }

            await projects.update({ description: interaction.options.getString('description')}, { where: { id: interaction.member.user.id } });

            interaction.reply(bold('Set project description to:\n') + `${interaction.options.getString('description')}`);
        
        } else if (interaction.commandName === 'search') {
            const projectExists = await projects.findOne({ where: { id: interaction.member.user.id } });

            console.log(projectExists.dataValues);

            if (!projectExists) {
                interaction.reply(bold(`Invalid search: no project associated with ${interaction.member.user.id}`));
                return;
            }

            //Get all contributors and this project
            const allContributors = await contributors.findAll();
            const project = projectExists.dataValues;

            //Loop over all contributors and this project
            for (i = 0; i < allContributors.length; i++) {
                let experienceTypeCompatible = false;
                let experienceTimeCompatible = false;
                let interestsProjectTypeCompatible = false;

                let contributor = allContributors[i].dataValues;
                
                //Check if type of experience is compatible
                if (
                   (project.devRole && contributor.devExperience) || 
                   (project.communityRole && contributor.communityExperience) || 
                   (project.marketingRole && contributor.marketingExperience) || 
                   (project.productRole && contributor.productExperience) || 
                   (project.opsRole && contributor.opsExperience)
                ) {
                    experienceTypeCompatible = true;
                }

                //Check if amount of experience is compatible
                if (
                   (project.experienceLevel1 && contributor.experienceLevel1) ||
                   (project.experienceLevel2 && contributor.experienceLevel2) ||
                   (project.experienceLevel3 && contributor.experienceLevel3) ||
                   (project.experienceLevel4 && contributor.experienceLevel4) ||
                   (project.experienceLevel5 && contributor.experienceLevel5)
                ) {
                    experienceTimeCompatible = true;
                }

                //Check project type meets interests
                if (
                   (project.daoType && contributor.daoInterest) ||
                   (project.defiType && contributor.defiInterest) ||
                   (project.nftType && contributor.nftInterest) ||
                   (project.publicGoodsType && contributor.publicGoodsInterest) ||
                   (project.artType && contributor.artInterest)
                ) {
                    interestsProjectTypeCompatible = true;
                }

                //If all are met, send a DM to both parties
                if (
                    experienceTypeCompatible &&
                    experienceTimeCompatible &&
                    interestsProjectTypeCompatible
                ) {
                    client.users.fetch(project.id, false).then(async (user) => {
                        const contributerUser = await client.users.fetch(contributor.id);
                        console.log(contributerUser);
                        if (contributor.description !== '') {
                            user.send(bold('Description of matched contributor:\n') +
                            `${contributor.description}\n` +
                            bold('Contributor discord:\n') + `${contributerUser.username}#${contributerUser.discriminator}`);
                        } else {
                            user.send(bold('Matched contributor discord:') + `${contributerUser.username}#${contributerUser.discriminator}`);
                        }              
                    });
                    
                    client.users.fetch(contributor.id, false).then(async (user) => {
                        const projectUser = await client.users.fetch(project.id);
                        if (contributor.description !== '') {
                            user.send(bold('Description of matched project:\n') +
                            `${contributor.description}\n` +
                            bold('Project discord:\n') + `${projectUser.username}#${projectUser.discriminator}`);
                        } else {
                            user.send(bold('Matched project discord:\n') + `${projectUser.username}#${projectUser.discriminator}`);
                        }        
                    });

                    interaction.reply(bold('Search executed. DMs sent if requirements were met.'));
                }
            }
        }
    }

    if (interaction.isSelectMenu()) {
        if (interaction.customId === 'experienceType') {
            await contributors.update({ 
                devExperience: 0,
                communityExperience: 0,
                marketingExperience: 0,
                productExperience: 0,
                opsExperience: 0},
                { where: { id: interaction.member.user.id } });

            for (let i=0; i < interaction.values.length; i++) {
                switch (interaction.values[i])  {
                    case 'dev':
                        await contributors.update({ 
                            devExperience: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'community':
                        await contributors.update({ 
                            communityExperience: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'marketing':
                        await contributors.update({ 
                            marketingExperience: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'product':
                        await contributors.update({ 
                            productExperience: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'ops':
                        await contributors.update({ 
                            opsExperience: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                }
            }

            interaction.reply(bold('Experience type(s) updated'));

        } else if (interaction.customId === 'experienceTime') {
            await contributors.update({ 
                experienceLevel1: 0,
                experienceLevel2: 0,
                experienceLevel3: 0,
                experienceLevel4: 0,
                experienceLevel5: 0},
                { where: { id: interaction.member.user.id } });

            switch (interaction.values[0])  {
                case 'less3months':
                    await contributors.update({ 
                        experienceLevel1: 1},
                        { where: { id: interaction.member.user.id } });
                    break;
                case 'less6months':
                    await contributors.update({ 
                        experienceLevel2: 1},
                        { where: { id: interaction.member.user.id } });
                    break;
                case 'less2years':
                    await contributors.update({ 
                        experienceLevel3: 1},
                        { where: { id: interaction.member.user.id } });
                    break;
                case 'less5years':
                    await contributors.update({ 
                        experienceLevel4: 1},
                        { where: { id: interaction.member.user.id } });
                    break;
                case 'greater5years':
                    await contributors.update({ 
                        experienceLevel5: 1},
                        { where: { id: interaction.member.user.id } });
                    break;
            }

            interaction.reply(bold('Experience time updated'));

        } else if (interaction.customId === 'interestAreas') {
            await contributors.update({ 
                daoInterest: 0,
                defiInterest: 0,
                nftInterest: 0,
                publicGoodsInterest: 0,
                artInterest: 0},
                { where: { id: interaction.member.user.id } });

            for (let i=0; i < interaction.values.length; i++) {
                switch (interaction.values[i])  {
                    case 'daos':
                        await contributors.update({ 
                            daoInterest: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'defi':
                        await contributors.update({ 
                            defiInterest: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'nfts':
                        await contributors.update({ 
                            nftInterest: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'publicgoods':
                        await contributors.update({ 
                            publicGoodsInterest: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'art':
                        await contributors.update({ 
                            artInterest: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                }
            }

            interaction.reply(bold('Interest areas(s) updated'));
        } else if (interaction.customId === 'rolesNeeded') {
            await projects.update({ 
                devRole: 0,
                communityRole: 0,
                marketingRole: 0,
                productRole: 0,
                opsRole: 0},
                { where: { id: interaction.member.user.id } });

            for (let i=0; i < interaction.values.length; i++) {
                switch (interaction.values[i])  {
                    case 'dev':
                        await projects.update({ 
                            devRole: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'community':
                        await projects.update({ 
                            communityRole: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'marketing':
                        await projects.update({ 
                            marketingRole: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'product':
                        await projects.update({ 
                            productRole: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'ops':
                        await projects.update({ 
                            opsRole: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                }
            }
            interaction.reply(bold('Role(s) needed updated'));
        } else if (interaction.customId === 'experienceTimeRequired') {

            await projects.update({ 
                experienceLevel1: 0,
                experienceLevel2: 0,
                experienceLevel3: 0,
                experienceLevel4: 0,
                experienceLevel5: 0},
                { where: { id: interaction.member.user.id } });
            for (let i=0; i < interaction.values.length; i++) {
                switch (interaction.values[i])  {
                    case 'less3months':
                        await projects.update({ 
                            experienceLevel1: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'less6months':
                        await projects.update({ 
                            experienceLevel2: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'less2years':
                        await projects.update({ 
                            experienceLevel3: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'less5years':
                        await projects.update({ 
                            experienceLevel4: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'greater5years':
                        await projects.update({ 
                            experienceLevel5: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                } 
            }
            interaction.reply(bold('Experience requirements updated'));

        } else if (interaction.customId === 'projectType') {
            await projects.update({ 
                daoType: 0,
                defiType: 0,
                nftType: 0,
                publicGoodsType: 0,
                artType: 0},
                { where: { id: interaction.member.user.id } });

            for (let i=0; i < interaction.values.length; i++) {
                switch (interaction.values[i])  {
                    case 'daos':
                        await projects.update({ 
                            daoType: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'defi':
                        await projects.update({ 
                            defiType: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'nfts':
                        await projects.update({ 
                            nftType: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'publicgoods':
                        await projects.update({ 
                            publicGoodsType: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                    case 'art':
                        await projects.update({ 
                            artType: 1},
                            { where: { id: interaction.member.user.id } });
                        break;
                }
            }
            
            interaction.reply(bold('Project type(s) updated'));
        }
    }
});

// Login to Discord with your client's token
client.login(token);