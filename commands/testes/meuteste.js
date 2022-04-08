module.exports = {
    name: "meuteste",
    permissions: ["SEND_MESSAGES"],
    run: async (client, message, args) => {
      return message.channel.send({content: "meu teste!"});
    },
};