require("dotenv");
require("module-alias/register");
const Discord = require("discord.js");
const client = new Discord.Client();
const TOKEN = process.env.TOKEN4;
const loadCommands = require("@root/commands/load-commands");
const loadFeatures = require("@root/features/load-features");

client.on("ready", () => {
    loadCommands(client);
    loadFeatures(client);
});

client.login(TOKEN);
