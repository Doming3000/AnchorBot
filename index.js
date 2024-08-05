const { GatewayIntentBits, Client, EmbedBuilder, Collection } = require("discord.js");
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const config = require(`${process.cwd()}/config.json`);
require('colors');

client.login(config.token)
client.commands = new Collection();

fs.readdirSync('./commands').forEach((dir) => {
  const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
  for (const file of commands) {
    let command = require(`./commands/${dir}/${file}`);
    console.log(`Comandos cargados: ${file} cargado`.yellow)
    client.commands.set(command.data.name, command);
  }
}); 

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for(const file of eventFiles) {
  const event = require(`./events/${file}`);
  if(event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  }
  else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}