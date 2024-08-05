import { Routes, Client, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';
import { config } from 'dotenv';

config();

const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;

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
  
  // Leer los comandos del directorio ./commands
  const commandDirs = readdirSync('./commands');
  for (const dir of commandDirs) {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = await import(`./commands/${dir}/${file}`);
      commandsData.push(command.data.toJSON());
    }
  }
  
  const rest = new REST({ version: '10' }).setToken(token);
  
  // Registrar los comandos en cada servidor
  for (let id of guilds) {
    try {
      await rest.put(Routes.applicationGuildCommands(clientId, id), { body: commandsData });
      console.log(`Successfully registered application commands for guild ${id}.`);
    } catch (error) {
      console.error(`Failed to register application commands for guild ${id}.`, error);
    }
  }
  client.destroy();
});