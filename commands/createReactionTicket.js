const Discord = require("discord.js");

module.exports = {
  name: "CreateReactionTicket",
  description: "Cria um ticket com reação",
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
          message
            .reply(
              "A reação foi adicionada com sucesso!, você já pode abrir um ticket!"
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
        const ticket = message.guild.channels.create({
          name: `ticket-${user.username}-${Math.floor(
            Math.random() * 9999
          )}${Math.floor(Math.random() * 9999)}`,
          reason: "Ticket criado por " + user.username,
          parent: "1063477095499583488",
          permissionOverwrites: [
            {
              id: "1063920668065943643", // ID do cargo Atendente
              allow: [
                Discord.PermissionsBitField.Flags.ViewChannel,
                Discord.PermissionsBitField.Flags.SendMessages,
                Discord.PermissionsBitField.Flags.ReadMessageHistory,
              ],
            },
            {
              id: user.id, // ID do autor do ticket
              allow: [
                Discord.PermissionsBitField.Flags.ViewChannel,
                Discord.PermissionsBitField.Flags.SendMessages,
                Discord.PermissionsBitField.Flags.ReadMessageHistory,
              ],
            },
            {
              id: "1063498152084242515", // ID do cargo Visitante
              deny: [
                Discord.PermissionsBitField.Flags.ViewChannel,
                Discord.PermissionsBitField.Flags.SendMessages,
                Discord.PermissionsBitField.Flags.ReadMessageHistory,
              ],
            },
          ],
        });

        await message.channel
          .send(`${message.author} seu ticket foi criado com sucesso!`)
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 3000);
          });

        reaction.users.remove(user.id);
      });
    } catch (err) {
      console.log(err);
    }
  },
};
