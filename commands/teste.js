module.exports = {
    name: "teste1",
    permissions: ["SEND_MESSAGES"],
    run: async (client, message, args) => {
      return message.channel.send({content: "Olá mundo"}).then((msg) => {
        setTimeout(() => msg.delete(), 15000);
      }).catch();
    },
};