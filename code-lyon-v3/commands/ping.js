module.exports = {
    name: "ping",
    description: "Pong!",
    async execute(client, message) {
        message.channel.send("Pong!");
    },
};
