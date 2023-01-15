const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const client = new Discord.Client({
  intents: [
    1,
    512,
    32768,
    2,
    128,
    "GuildMessages",
    "GuildMessageReactions",
    "Guilds",
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

require("dotenv").config();

client.login(process.env.PRIVATE_BOT_TOKEN);

client.on("ready", () => {
  console.log(`Aoba, eu estou online no servidor (${client.user.username})🔥`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === Discord.ChannelType.DM) return;

  if (message.content.startsWith(config.prefix)) {
    const args = message.content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
      const commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args).then(() => {
        if (config.deleteCommandsMessage === true) {
          setTimeout(() => {
            message.delete();
          }, 1500);
        }
        console.log(
          `\nO @${message.author.username} pediu para mim executar o comando (${config.prefix}${command}) \nComando executado com sucesso!`
        );
      });
    } catch (err) {
      if (config.deleteCommandsMessage === true) {
        message.delete();
      }

      message.channel
        .send(
          `Ei ${message.author}, esse comando não existe no meu banco de dados!`
        )
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 3000);
        });

      console.log(
        `\nO @${message.author.username} pediu para mim executar o comando (${config.prefix}${command}) \nMas eu não encontrei esse comando no meu banco de dados!`
      );
    }
  }
});
