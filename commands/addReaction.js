const Discord = require("discord.js");

module.exports = {
  name: "addReaction",
  description: "Adiciona uma reação a uma mensagem",
  async run(client, message, args) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.reply("você não tem permissão para usar esse comando!");
    }

    const messageID = args[0];
    const emoji = args[1];

    if (!messageID || !emoji) {
      return message.reply(
        "você precisa colocar um ID de mensagem e um emoji!"
      );
    }

    const msg = await message.channel.messages.fetch(messageID);

    msg.react(emoji);
  },
};
