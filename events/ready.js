module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log('\033[0;33m' + `${client.user.tag}` + '  \033[0;36miniciado!\033[0;0m');
    client.user.setPresence({ activities: [{ name: "discord.gg/pdl" }] });
  },
};
