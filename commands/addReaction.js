const Discord = require("discord.js");

module.exports = {
  name: "addReaction",
  description: "Adiciona uma reação a uma mensagem",
  async run(client, message, args) {
    try {
      const messageID = args[0];
      const emoji = args[1];

      if (args > 2)
        return message
          .reply("Parece que você colocou mais argumentos que o necessario!")
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 3000);
          });

      if (!messageID)
        return message
          .reply("Você esqueceu de colocar o ID da Messagem!")
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 3000);
          });

      if (!emoji)
        return message
          .reply("Você esqueceu de colocar um emoji!")
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 3000);
          });

      const msg = await message.channel.messages.fetch(messageID);
      msg
        .react(emoji)
        .then(() => {
          message.reply("Reação adicionada com sucesso!").then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 3000);
          });
        })
        .catch((err) => {
          message.reply("O emoji que você colocou não existe!").then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 3000);
          });
        });
    } catch (err) {
      message.reply("Ocorreu um erro ao adicionar a reação!").then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 3000);
      });
    }
  },
};
