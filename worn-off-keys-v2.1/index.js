const Discord = require("discord.js");
const client = new Discord.Client();

const { TOKEN } = require("./config.json");
const loadCommands = require("./commands/load-commands");

client.on("ready", () => {
    console.log("The client is ready!");
    loadCommands(client);
});

client.login(TOKEN);
