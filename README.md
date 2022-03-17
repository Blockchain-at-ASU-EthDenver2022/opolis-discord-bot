# Opolis discord bot

This is a discord bot created by Blockchain at ASU during EthDenver 2022 for Opolis bounty #1. It matches contributors and projects together in an effort to automate aspects of the process of finding work.

## Motivation

This project was created to fulfill the requirements of Opolis' bounty #1 "Future of finding work" for Eth Denver 2022. The description can be found at https://www.ethdenver.com/bounties/opolis. It is also pasted below for longevity.

We're looking for someone to build an easy, open-source Discord bot that collects information from "contributors" like type of experience (Dev, Community, Marketing, Product, Ops), years of experience, area of interest (DAOs, DeFi, NFTs, Public Goods, etc), last project worked on; "projects" like role (Dev, Community, Marketing, Product, Ops), range of experience (ex. 2-5), type of project (DAOs, DeFi, NFTs, Public Goods, etc), next steps.

And where there's a match 51% of these items, making the connect between the contributor and project via a private DM between the two candidates.

## Setup

Clone the repository and run ```npm install``` to download all required dependencies. Make sure to create an application and bot on discord.com/developers. Copy the bot token and clientId to ```config.json```. Optionally, you may include a ```TEST_GUILD_ID``` and set ```PRODUCTION``` to ```false``` in order to test the bot on a development discord server. Next, run ```node deploy-commands.js```. This will interact with the Discord API to register the appropriate slash commands, either with a development server or globally depending on the value of ```PRODUCTION```. From there, running ```node index.js``` will start the bot. You will receive a ```Ready!``` message in your console when the bot has started successfully.

## Details

The bot matches contributors and projects based on three criteria: role, experience, and project type. When a project performs a search, it will check all possible contributors for matches. Searches are initiated by projects searching for contributors. Searches are done on a per-server basis (there is no cross-server searching due to the potential for abuse). In the event of a match, both the contributor and project will be sent a DM with the information of the other party. The original specification asked for a group DM to be created, but this is not possible under the Discord TOS (it can only be done using a user-bot).

This bot is meant to act as a proof of concept for using the discord platform as a method of connecting projects and contributors in DeFi. It could easily be expanded to include salary bands/expectations as well as countless other potential categories. Many individuals already use discord as a means of finding work; adding basic filtering and automation to this process can save countless hours.

## Commands

/contributorinfo - Allows a contributor to specify their role(s), experience, and project interest(s).

/contributordescription - Allows a contributor to include a description (previous projects worked on, real name, portfolio website, etc.)

/projectinfo - Allows a project to specify their required role(s), necessary experience for those role(s), and the type(s) of their project

/projectdescription - Allows a project to include a description (project name and website, additional information about the role(s), etc.)

/search - Allows a project to search for potential contributors. If a match is found, DMs both the contributor and the project with each other's description and discord information.

## Improvements

- Use an architecture which allows multiple instances of the bot to run in parallel. An easy way to do this would be to pass the interaction to another thread based on guild id, because seperate discord servers do not need to have their data synced. All of the computationally expensive database interactions can be spread across multiple instances.

- Adding a proper management system for contributor and project permissions, to allow servers to lock commands behind roles. This was not added as it may soon be obsolete with https://support.discord.com/hc/en-us/articles/4644915651095-Command-Permissions.

- Allow interoperability between groups of servers who opt-in to be part of the same pool of projects and contributors. This functionality could be fairly complex to add depending on the details. The easiest way to implement the functionality would be for one server to act as the administrator of a group, with the ability to invite/kick other servers the pool.
