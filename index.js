require('dotenv').config();
const { Client, Intents } = require("discord.js");
const commandHandler = require("./utils/commandHandler.js");
const fs = require("fs");
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;


const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_BANS,
  ],
});

function delegateEventListener(event) {
  if (event.once) {
    return client.once(event.name, (...args) => event.execute(client, ...args));
  }
  return client.on(event.name, (...args) => event.execute(client, ...args));
}

function isJavaScriptFile(fileName) {
  return fileName.endsWith(".js");
}

fs.readdirSync("./events")
  .filter(isJavaScriptFile)
  .forEach((file) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const event = require(`./events/${file}`);
    delegateEventListener(event);
  });

  client.on('messageCreate', async (message) => {
    const args = message.content.trim().slice(prefix.length).split(/ +/g);
    const command = args.shift().toLocaleLowerCase();
  
    if(command == "teste"){
      return message.channel.send({content: "Seu teste foi um sucesso!"});
    }
  });

commandHandler.init();

client.login(token);