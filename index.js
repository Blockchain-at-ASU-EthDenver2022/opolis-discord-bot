const { Client, Intents, MessageEmbed } = require('discord.js');
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');
const { experienceTypeRow, experienceTimeRow, interestAreasRow, rolesNeededRow, experienceTimeRequiredRow, projectTypeRow } = require('./discordEmbeds')
const { TOKEN } = require('./config.json');
const database = require('./database');
const contributors = database.contributors;
const projects = database.projects;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    client.user.setPresence({
        activities: [{ 
          name: "collaboration",
          type: "WATCHING"
        }],
        status: "active"
    })
    
    contributors.sync();
    projects.sync();
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
        if (interaction.commandName === 'contributorinfo') {
            const contributorExists = await contributors.findOne({ where: { id: interaction.member.user.id, serverid: interaction.guildId } });
            
            if (!contributorExists) {
                const newContributor = await contributors.create({
                    id: interaction.member.user.id,
                    serverid: interaction.guildId,
                });
                console.log(`Added new contributor: ${interaction.member.user.id}`);
            } else {
                const description = contributorExists.dataValues.description;

                await contributors.destroy({ where: { id: interaction.member.user.id } });
                const newContributor = await contributors.create({
                    id: interaction.member.user.id,
                    serverid: interaction.guildId,
                    description: description
                });
                console.log(`Reset contributor data: ${interaction.member.user.id}`);
            }

            const embed = new MessageEmbed().setTitle('Enter contributor information below')
            
            interaction.reply({ ephemeral: true, embeds: [embed], components: [experienceTypeRow, experienceTimeRow, interestAreasRow] });
        
        } else if (interaction.commandName === 'projectinfo') {
            const projectExists = await projects.findOne({ where: { id: interaction.member.user.id, serverid: interaction.guildId } });

            if (!projectExists) {
                const newProject = await projects.create({
                    id: interaction.member.user.id,
                    serverid: interaction.guildId,
                });
                console.log(`Added new project: ${interaction.member.user.id}`);
            } else {
                const description = projectExists.dataValues.description;

                await projects.destroy({ where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                const newProject = await projects.create({
                    id: interaction.member.user.id,
                    serverid: interaction.guildId,
                    description: description
                });
                console.log(`Reset project data: ${interaction.member.user.id}`);
            }

            const embed = new MessageEmbed().setTitle('Enter project information below')
            
            interaction.reply({ ephemeral: true, embeds: [embed], components: [rolesNeededRow, experienceTimeRequiredRow, projectTypeRow] });
        
        } else if (interaction.commandName === 'contributordescription') {
            const contributorExists = await contributors.findOne({ where: { id: interaction.member.user.id, serverid: interaction.guildId } });
            
            if (!contributorExists) {
                await contributors.create({
                    id: interaction.member.user.id,
                    serverid: interaction.guildId,
                });
                console.log(`Added new contributor: ${interaction.member.user.id}`);
            }

            await contributors.update({ description: interaction.options.getString('description')}, { where: { id: interaction.member.user.id, serverid: interaction.guildId, } });
            
            interaction.reply({ ephemeral: true, content: bold('Set contributor description to:\n') + `${interaction.options.getString('description')}` });
        
        } else if (interaction.commandName === 'projectdescription') {
            const projectExists = await projects.findOne({ where: { id: interaction.member.user.id, serverid: interaction.guildId } });
            
            if (!projectExists) {
                await projects.create({
                    id: interaction.member.user.id,
                    serverid: interaction.guildId,
                });
                console.log(`Added new project: ${interaction.member.user.id}`);
            }

            await projects.update({ description: interaction.options.getString('description')}, { where: { id: interaction.member.user.id, serverid: interaction.guildId } });

            interaction.reply({ ephemeral: true, content: bold('Set project description to:\n') + `${interaction.options.getString('description')}` });
        
        } else if (interaction.commandName === 'search') {
            //Search commands are deliberately not made ephemeral in order to allow easier detection of search-spamming.
            const projectExists = await projects.findOne({ where: { id: interaction.member.user.id, serverid: interaction.guildId } });

            if (!projectExists) {
                interaction.reply({ ephemeral: true, content: bold(`Invalid search: no project associated with your account`) });
                return;
            }

            //Get all contributors and this project
            const allContributors = await contributors.findAll();
            const project = projectExists.dataValues;

            //Loop over all contributors and this project
            for (i = 0; i < allContributors.length; i++) {
                const contributor = allContributors[i].dataValues;

                if(project.id === contributor.id) {
                    continue;
                }

                let experienceTypeCompatible = false;
                let experienceTimeCompatible = false;
                let interestsProjectTypeCompatible = false;
                
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
                            user.send(bold('Matched contributor discord:\n') + `${contributerUser.username}#${contributerUser.discriminator}`);
                        }              
                    });
                    
                    client.users.fetch(contributor.id, false).then(async (user) => {
                        const projectUser = await client.users.fetch(project.id);
                        if (project.description !== '') {
                            user.send(bold('Description of matched project:\n') +
                            `${project.description}\n` +
                            bold('Project discord:\n') + `${projectUser.username}#${projectUser.discriminator}`);
                        } else {
                            user.send(bold('Matched project discord:\n') + `${projectUser.username}#${projectUser.discriminator}`);
                        }        
                    });

                }
            }
            interaction.reply(bold('Search executed. DMs sent if requirements were met.'));
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
                { where: { id: interaction.member.user.id, serverid: interaction.guildId } });

            for (let i=0; i < interaction.values.length; i++) {
                switch (interaction.values[i])  {
                    case 'dev':
                        await contributors.update({ 
                            devExperience: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId, } });
                        break;
                    case 'community':
                        await contributors.update({ 
                            communityExperience: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId, } });
                        break;
                    case 'marketing':
                        await contributors.update({ 
                            marketingExperience: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId, } });
                        break;
                    case 'product':
                        await contributors.update({ 
                            productExperience: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId, } });
                        break;
                    case 'ops':
                        await contributors.update({ 
                            opsExperience: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId, } });
                        break;
                }
            }

            interaction.reply({ ephemeral: true, content: bold('Experience type(s) updated') });

        } else if (interaction.customId === 'experienceTime') {
            await contributors.update({ 
                experienceLevel1: 0,
                experienceLevel2: 0,
                experienceLevel3: 0,
                experienceLevel4: 0,
                experienceLevel5: 0},
                { where: { id: interaction.member.user.id, serverid: interaction.guildId } });

            switch (interaction.values[0])  {
                case 'less3months':
                    await contributors.update({ 
                        experienceLevel1: 1},
                        { where: { id: interaction.member.user.id, serverid: interaction.guildId, } });
                    break;
                case 'less6months':
                    await contributors.update({ 
                        experienceLevel2: 1},
                        { where: { id: interaction.member.user.id, serverid: interaction.guildId, } });
                    break;
                case 'less2years':
                    await contributors.update({ 
                        experienceLevel3: 1},
                        { where: { id: interaction.member.user.id, serverid: interaction.guildId, } });
                    break;
                case 'less5years':
                    await contributors.update({ 
                        experienceLevel4: 1},
                        { where: { id: interaction.member.user.id, serverid: interaction.guildId, } });
                    break;
                case 'greater5years':
                    await contributors.update({ 
                        experienceLevel5: 1},
                        { where: { id: interaction.member.user.id, serverid: interaction.guildId, } });
                    break;
            }

            interaction.reply({ ephemeral: true, content: bold('Experience time updated') });

        } else if (interaction.customId === 'interestAreas') {
            await contributors.update({ 
                daoInterest: 0,
                defiInterest: 0,
                nftInterest: 0,
                publicGoodsInterest: 0,
                artInterest: 0},
                { where: { id: interaction.member.user.id, serverid: interaction.guildId } });

            for (let i=0; i < interaction.values.length; i++) {
                switch (interaction.values[i])  {
                    case 'daos':
                        await contributors.update({ 
                            daoInterest: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'defi':
                        await contributors.update({ 
                            defiInterest: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'nfts':
                        await contributors.update({ 
                            nftInterest: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'publicgoods':
                        await contributors.update({ 
                            publicGoodsInterest: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'art':
                        await contributors.update({ 
                            artInterest: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                }
            }

            interaction.reply({ ephemeral: true, content: bold('Interest areas(s) updated') });
        } else if (interaction.customId === 'rolesNeeded') {
            await projects.update({ 
                devRole: 0,
                communityRole: 0,
                marketingRole: 0,
                productRole: 0,
                opsRole: 0},
                { where: { id: interaction.member.user.id, serverid: interaction.guildId } });

            for (let i=0; i < interaction.values.length; i++) {
                switch (interaction.values[i])  {
                    case 'dev':
                        await projects.update({ 
                            devRole: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'community':
                        await projects.update({ 
                            communityRole: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'marketing':
                        await projects.update({ 
                            marketingRole: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'product':
                        await projects.update({ 
                            productRole: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'ops':
                        await projects.update({ 
                            opsRole: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                }
            }
            interaction.reply({ ephemeral: true, content: bold('Role(s) needed updated') });
        } else if (interaction.customId === 'experienceTimeRequired') {

            await projects.update({ 
                experienceLevel1: 0,
                experienceLevel2: 0,
                experienceLevel3: 0,
                experienceLevel4: 0,
                experienceLevel5: 0},
                { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
            for (let i=0; i < interaction.values.length; i++) {
                switch (interaction.values[i])  {
                    case 'less3months':
                        await projects.update({ 
                            experienceLevel1: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'less6months':
                        await projects.update({ 
                            experienceLevel2: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'less2years':
                        await projects.update({ 
                            experienceLevel3: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'less5years':
                        await projects.update({ 
                            experienceLevel4: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'greater5years':
                        await projects.update({ 
                            experienceLevel5: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                } 
            }
            interaction.reply({ ephemeral: true, content: bold('Experience requirements updated') });

        } else if (interaction.customId === 'projectType') {
            await projects.update({ 
                daoType: 0,
                defiType: 0,
                nftType: 0,
                publicGoodsType: 0,
                artType: 0},
                { where: { id: interaction.member.user.id, serverid: interaction.guildId } });

            for (let i=0; i < interaction.values.length; i++) {
                switch (interaction.values[i])  {
                    case 'daos':
                        await projects.update({ 
                            daoType: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'defi':
                        await projects.update({ 
                            defiType: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'nfts':
                        await projects.update({ 
                            nftType: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'publicgoods':
                        await projects.update({ 
                            publicGoodsType: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                    case 'art':
                        await projects.update({ 
                            artType: 1},
                            { where: { id: interaction.member.user.id, serverid: interaction.guildId } });
                        break;
                }
            }
            
            interaction.reply({ ephemeral: true, content: bold('Project type(s) updated') });
        }
    }
});

// Login to Discord with your client's token
client.login(TOKEN);