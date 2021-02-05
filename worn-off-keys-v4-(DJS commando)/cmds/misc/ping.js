const Commando = require("discord.js-commando");

module.exports = class TalkCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "talk",
            group: "misc",
            memberName: "talk",
            description: "Talks through the bot",
        });
    }
    run = async (message, args) => {
        message.delete();
        if (args.length === 0) {
            return message.reply(
                "Please provide a message you want me to say!"
            );
        }
        const { channel } = message;
        channel.send(args);
    };
};
