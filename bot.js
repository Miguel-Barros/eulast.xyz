const Discord = require("discord.js");
const client = new Discord.Client({ intents: [1, 512, 32768, 2, 128] });
const config = require("./config.json");
const fs = require("fs");

require("dotenv").config();

client.login(process.env.PRIVATE_BOT_TOKEN);

client.on("ready", () => {
  console.log(`Aoba estou online no servidor (${client.user.username})🔥`);
});

client.on("messageCreate", (message) => {
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
      commandFile.run(client, message, args);
    } catch (err) {
      console.error("Erro:" + err);
    }
  }
});

client.on("guildMemberAdd", (member) => {
  let role = member.guild.roles.cache.find((r) => r.name === "Não Verificado");
  member.roles.add(role);
});
