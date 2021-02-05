const Discord = require("discord.js");
const dotenv = require("dotenv");

const client = new Discord.Client();
const TOKEN = process.env.TOKEN4;

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

client.login(TOKEN);
