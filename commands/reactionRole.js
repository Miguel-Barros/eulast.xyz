const Discord = require("discord.js");

module.exports = {
  name: "reactionRole",
  description: "Distribui cargos por reações",
  async run(client, message, args) {
    try {
      const messageID = args[0];
      const emoji = args[1];
      const role = message.mentions.roles.first();

      if (args > 3)
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

      if (!role)
        return message
          .reply("Você esqueceu de colocar um cargo!")
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 3000);
          });

      const msg = await message.channel.messages.fetch(messageID);
      msg
        .react(emoji)
        .then(() => {
          message
            .reply(
              `O cargo ${role} foi atribuio ao emoji ${emoji} com sucesso!`
            )
            .then((msg) => {
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

      client.on("messageReactionAdd", async (reaction, user) => {
        if (reaction.message.id === messageID) {
          if (reaction.emoji.name === emoji) {
            await reaction.message.guild.members.cache
              .get(user.id)
              .roles.add(role)
              .then(() => {
                reaction.message.guild.members.cache
                  .get(user.id)
                  .roles.remove("1063498029858033784");
              });
          }
        } else {
          return;
        }
      });

      client.on("messageReactionRemove", async (reaction, user) => {
        if (reaction.message.id === messageID) {
          if (reaction.emoji.name === emoji) {
            await reaction.message.guild.members.cache
              .get(user.id)
              .roles.remove(role);
          }
        } else {
          return;
        }
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
