const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["event_handler", "command_handler"].forEach((handler) => {
    console.log(handler);
    require(`./handlers/${handler}`)(client, Discord);
});

client.login("YOUR_TOKEN_HERE");
