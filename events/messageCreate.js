const { MessageEmbed } = require('discord.js');
const commandHandler = require("../utils/commandHandler.js");
const prefix = process.env.PREFIX;

function checkPermission(memberPermissions, permission) {
  return memberPermissions.has(permission);
}

module.exports = {
  name: "messageCreate",
  execute(client, message) {
    if (message.author.bot) return;

    console.log('[>]\033[0;35m' + `[${message.guild}]-(${message.channel.name}) ` + '\033[0;36m' + `${message.author.tag}: ` + '\033[0;34m' + `${message.content}` + '\033[0;0m');

    if (!message.content.toLocaleLowerCase().startsWith(prefix)) return;

    setTimeout(() => message.channel.messages.delete(message.id), 1);

    const args = message.content.trim().slice(prefix.length).split(/ +/g);
    const command = args.shift().toLocaleLowerCase();
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const commandFile = commandHandler.commands.get(command);

    if (!commandFile) return;
    if (commandFile.permissions) {
      let hasEveryPermission = commandFile.permissions.every((permission) => checkPermission(message.member.permissions, permission));
      if (hasEveryPermission) commandFile.run(client, message, args);
    } else {
      commandFile.run(client, message, args);
    }
  },
};
