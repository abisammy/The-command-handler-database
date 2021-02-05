const Discord = require("discord.js");
const client = new Discord.Client();

const { TOKEN } = require("./config.json");
const command = require("./command");

client.on("ready", () => {
    console.log("The client is ready!");
    command(client, "ping", (message) => {
        message.channel.send("Pong!");
    });
});

client.login(TOKEN);
