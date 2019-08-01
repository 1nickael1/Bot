const Discord = require('discord.js');
const Client = new Discord.Client();
require('dotenv').config();

Client.on('ready', () => {
    console.log(`Logado como ${Client.user.tag}!`)
})

function menssagem(comando, resposta) {
    Client.on('message', msg => {
        if (msg.content === 'n.'+comando) {
            msg.reply(resposta)
        }
    })
}

menssagem('comandos', '```*n.ping*```')

Client.login(process.env.TOKEN)