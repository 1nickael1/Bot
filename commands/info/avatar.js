const {MessageEmbed} = require('discord.js');
const color = process.env.COLOR;

module.exports = {
    name: "avatar",
    permissions: ["EMBED_LINK"],
    run: async(client, message, args)=>{
        const user = message.mentions.users.first() || message.member.user
        const avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
        const embed = new MessageEmbed()
          .setColor(color)
          .setTitle(`${user.tag}`)
          .setURL(avatar)
          .setImage(avatar);
        return message.channel.send({embeds: [embed]}).then((msg) => {
            setTimeout(() => msg.delete(), 15000);
          }).catch();   
    }
}