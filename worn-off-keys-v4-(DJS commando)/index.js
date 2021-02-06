require("module-alias/register");
// const Discord = require("discord.js");
// const client = new Discord.Client();

const path = require("path");
const Commando = require("discord.js-commando");
const { TOKEN } = require("@root/confing.json");
const { PREFIX } = require("@root/config.json");
const loadFeatures = require("@root/features/load-features");

const client = new Commando.CommandoClient({
    owner: "468128787884670986",
    commandPrefix: PREFIX,
});

client.on("ready", () => {
    client.registry
        .registerGroups([
            ["math", "Math commands"],
            ["misc", "misc commands"],
        ])
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, "cmds"));

    loadFeatures(client);
});

client.login(TOKEN);
