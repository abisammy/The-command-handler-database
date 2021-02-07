const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["event_handler", "command_handler"].forEach((handler) => {
    console.log(handler);
    require(`./handlers/${handler}`)(client, Discord);
});

client.login("Nzg5OTMzNTYyNTkzOTM1NDIw.X95Q9Q.2ln0NN08d4nkL8O_ahTMDYarEgw");
