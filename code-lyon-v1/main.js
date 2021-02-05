const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "-";

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if (command === "ping") {
        message.channel.send("Pong!");
    }
});

client.login("YOUR_TOKEN_HERE");
