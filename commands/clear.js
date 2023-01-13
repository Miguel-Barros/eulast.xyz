const Discord = require("discord.js");

module.exports = {
  name: "clear",
  description: "Limpa todas as mensagens do canal",
  async run(client, message, args) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.reply("você não tem permissão para usar esse comando!");
    }

    const amount = args.join(" ");

    if (!amount || isNaN(amount) || amount < 1 || amount > 100 || amount == 0) {
      return message.reply("você precisa colocar um número de 1 a 100!");
    }

    await message.channel.messages.fetch({ limit: amount }).then((messages) => {
      message.channel.bulkDelete(messages);
    });

    message.reply(`Foram deletadas ${amount} mensagens!`).then((msg) => {
      setTimeout(() => msg.delete(), 5000);
    });
  },
};
