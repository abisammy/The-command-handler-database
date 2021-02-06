const { PREFIX } = require("@root/config.json");

const validatePermisions = (permissions) => {
    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ];

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission node "${permission}"`);
        }
    }
};

let recentlyRan = []; // guildId-userId-command

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = "",
        permissionError = "You do not have permissions to run this command!",
        minArgs = 0,
        maxArgs = null,
        cooldown = -1,
        requiredChannel = "",
        permissions = [],
        requiredRoles = [],
        callback,
    } = commandOptions;

    // Ensure the command and aliases are in an array
    if (typeof commands === "string") {
        commands = [commands];
    }

    console.log(`Registering command "${commands[0]}"`);

    // Ensure the permissions are in an array and are all valid
    if (permissions.lenth) {
        if (typeof permissions === "string") {
            permissions = [permissions];
        }

        validatePermisions(permissions);
    }

    client.on("message", (message) => {
        const { member, content, guild, channel } = message;

        for (const alias of commands) {
            if (
                content
                    .toLowerCase()
                    .startsWith(`${PREFIX}${alias.toLowerCase()}`)
            ) {
                // A command has been ran

                // Ensure we are in the right channel
                if (requiredChannel !== channel.name) {
                    const foundChannel = guild.channels.cache.find(
                        (channel) => {
                            return channel.name === requiredChannel;
                        }
                    );

                    message.reply(
                        `This command must be ran in <#${foundChannel.id}>`
                    );
                    return;
                }

                // Ensure the user has the required permission
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        message.reply(permissionError);
                        return;
                    }
                }

                // Ensure the user has the required role
                for (const requriedRole of requiredRoles) {
                    const role = guild.roles.cache.find(
                        (role) => role.name === requiredRole
                    );

                    if (!role || !member.roles.cache.had(role.id)) {
                        message.reply(
                            `You must have the "${requiredRole}" role to use this command!`
                        );
                        return;
                    }
                }

                // ensure the user has not ran this command too frequently
                let cooldownString = `${guild.id}-${member.id}-${commands[0]}`;
                if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
                    message.reply(
                        "You cannot use that command so soon please wait!"
                    );
                    return;
                }

                const arguments = content.split(/[ ]+/);

                // Remove the command
                arguments.shift();

                // Ensure we have the correct args
                if (
                    arguments.length < minArgs ||
                    (maxArgs !== null && arguments.length > maxArgs)
                ) {
                    message.reply(
                        `Incorrect syntac Use ${PREFIX}${alias} ${expectedArgs}`
                    );
                    return;
                }

                if (cooldown > 0) {
                    recentlyRan.push(cooldownString);

                    setTimeout(() => {
                        recentlyRan = recentlyRan.filter((string) => {
                            return string !== cooldownString;
                        });
                    }, 1000 * cooldown);
                }

                // Handle the custom command code
                callback(message, arguments, arguments.join(" "));
                return;
            }
        }
    });
};
