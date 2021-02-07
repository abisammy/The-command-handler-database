module.exports = {
    name: "ping",
    aliases: ["p"],
    cooldown: 100,
    description: "Pong!",
    async execute(message, args, cmd, client, Discord) {
        message.channel.send("Pong!");
    },
};
