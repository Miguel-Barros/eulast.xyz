const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["MessageContent"] });

require("dotenv").config();

client
  .login(process.env.PRIVATE_BOT_TOKEN)
  .then(() => {
    console.log(`Aoba estou online no servidor (${client.user.username})🔥`);
  })
  .catch((err) => {
    console.log(`Opps, tive um erro - ${err}`);
  });
