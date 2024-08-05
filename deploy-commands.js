import { Routes, Client, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';
import { config } from 'dotenv';

config();

client = process.env.CLIENT_ID;
token = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.login(token).then(async () => {
  const guilds = client.guilds.cache.map(guild => guild.id);
  let commandsData = [];
  
  readdirSync('./commands').forEach((dir) => {
    const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
    for (const file of commands) {
      let command = require(`./commands/${dir}/${file}`);
      commandsData.push(command.data.toJSON());
    }
  }); 
  
  const rest = new REST({ version: '10' }).setToken(token);
  
  for(let id of guilds){
    rest.put(Routes.applicationGuildCommands(client, id), { body: commandsData })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
  }
  client.destroy();
})