# Opolis discord bot

This is a discord bot created by Blockchain at ASU during EthDenver 2022 for Opolis bounty #1. It matches contributors and projects together.

## Setup

Clone the repository and run ```npm install``` to download all required dependencies. Make sure to create an application and bot on discord.com/developers. Copy the bot token and clientId to ```config.json```. Optionally, you may include a ```TEST_GUILD_ID``` and set ```PRODUCTION``` to ```false``` in order to test the bot on a development discord server. Next, run ```node deploy-commands.js```. This will interact with the Discord API to register the appropriate slash commands, either with a development server or with all servers depending on the value of ```PRODUCTION```. From there, running ```node index.js``` will start the bot. You will receive a ```Ready!``` message in your console when the bot has started successfully.

## Details

The bot matches contributors and projects based on three criteria: role, experience, and project type. When a project performs a search, it will check all possible contributors for matches. Searches are done on a per-server basis (there is no cross-server searching due to the potential for abuse). In the event of a match, both the contributor and project will be sent a DM with the information of the other party. The original specification asked for a group DM to be created, but this is not possible under the Discord TOS (it can only be done using a user-bot). Currently, the bot matches information globally (across servers). Modifying the bot to search exclusively within the same server would simply require a serverid field to be added to each database, and for the contributor section of the search function to be modified to include the serverid in the search parameters.

## Commands

/contributorinfo - Allows a contributor to specify their role(s), experience, and project interest(s).

/contributordescription - Allows a contributor to include a description (previous projects worked on, real name, portfolio website, etc.)

/projectinfo - Allows a project to specify their required role(s), necessary experience for those role(s), and the type(s) of their project

/projectdescription - Allows a project to include a description (project name and website, additional information about the role(s), etc.)

/search - Allows a project to search for potential contributors. If a match is found, DMs both the contributor and the project with each other's description and discord information.
