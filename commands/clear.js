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
      return message.reply("você precisa especificar um número entre 1 e 100!");
    }

    await message.channel.messages.fetch({ limit: amount }).then((messages) => {
      if (messages.size <= 1) {
        return message
          .reply("Parece que não há mensagens para serem apagadas!")
          .then((msg) => {
            setTimeout(() => {
              message.delete();
              msg.delete();
            }, 5000);
          });
      }

      message
        .reply(`Estou limpando ${amount} mensagens, um segundo...`)
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 3000);
        });
      setTimeout(() => {
        message.channel.bulkDelete(messages);
        message.channel
          .send(
            `Uffa... ${message.author} consegui apagar as mensagens com sucesso! `
          )
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 10000);
          });
      }, 3000);
    });
  },
};
