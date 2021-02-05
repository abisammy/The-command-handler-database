const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv");
const TOKEN = process.env.TOKEN4;

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["event_handler", "command_handler"].forEach((handler) => {
    console.log(handler);
    require(`./handlers/${handler}`)(client, Discord);
});

client.login(TOKEN);
