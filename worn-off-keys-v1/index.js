require("dotenv");
const Discord = require("discord.js");
const client = new Discord.Client();
const TOKEN = process.env.TOKEN4;
const command = require("./command");

client.on("ready", () => {
    console.log("The client is ready!");

    command(client, "ping", (message) => {
        message.channel.send("Pong!");
    });
});

client.login(TOKEN);
