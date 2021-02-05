const Commando = require("discord.js-commando");

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "add",
            group: "math",
            memberName: "add",
            description: "Adds two numbers together",
            argsType: "multiple",
            argsCount: 2,
        });
    }
    run = async (message, args) => {
        const num1 = +args[0];
        const num2 = +args[1];
        if (!num1 || !num2) {
            return message.reply("Invalid amount of arguments provided!");
        }

        message.reply(`The sum is ${num1 + num2}`);
    };
};
