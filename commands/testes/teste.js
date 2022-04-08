module.exports = {
    name: "teste1",
    permissions: ["SEND_MESSAGES"],
    run: async (client, message, args) => {
      return message.channel.send({content: "Seu teste1 foi um sucesso!"});
    },
};