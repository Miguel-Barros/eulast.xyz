const Discord = require("discord.js");

module.exports = {
  name: "createTicket",
  description: "Cria um ticket",
  async run(client, message, args) {
    try {
      const ticket = message.guild.channels.create({
        name: `ticket-${message.author.username}-${Math.floor(
          Math.random() * 9999
        )}${Math.floor(Math.random() * 9999)}`,
        reason: "Ticket criado por " + message.author.username,
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
            id: message.author.id, // ID do autor do ticket
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
    } catch (err) {
      if (err) {
        message.channel.send("Ocorreu um erro ao criar o ticket! " + err);
      }
    }
  },
};
