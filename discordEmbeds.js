const { MessageActionRow, MessageSelectMenu } = require('discord.js');

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

module.exports ={
    experienceTypeRow, experienceTimeRow, interestAreasRow, rolesNeededRow, experienceTimeRequiredRow, projectTypeRow
}
