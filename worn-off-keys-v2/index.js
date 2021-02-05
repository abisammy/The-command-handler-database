const Discord = require("discord.js");
const client = new Discord.Client();
const { TOKEN } = require("./config.json");
const path = require("path");
const fs = require("fs");

client.on("ready", () => {
    console.log("The client is ready!");

    const baseFile = "command-base.js";
    const commandBase = require(`./commands/${baseFile}`);

    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file));
                commandBase(client, option);
            }
        }
    };

    readCommands("commands");
});

client.login(TOKEN);
