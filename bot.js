const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["MessageContent"] });

client
  .login("token")
  .then(() => {
    console.log(`Aoba estou online no servidor ${client.user.tag}🔥`);
  })
  .catch((err) => {
    console.log(`Opps, tive um erro - ${err}`);
  });
