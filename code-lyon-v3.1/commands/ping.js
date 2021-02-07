module.exports = {
    name: "ping",
    aliases: ["p"],
    description: "Pong!",
    async execute(client, message) {
        message.channel.send("Pong!");
    },
};
