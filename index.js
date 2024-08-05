import { GatewayIntentBits, Client, EmbedBuilder, Collection } from "discord.js";
import { readdirSync, readFileSync } from 'fs';
import colors from 'colors'; // No eliminar.

// Leer el archivo config.json
const config = JSON.parse(readFileSync('./config.json'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.login(config.token);
client.commands = new Collection();

readdirSync('./commands').forEach((dir) => {
  const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
  for (const file of commands) {
    import(`./commands/${dir}/${file}`).then((commandModule) => {
      const command = commandModule.default || commandModule;
      if (command && command.data) {
        console.log(`Comandos cargados: ${file} cargado`.yellow);
        client.commands.set(command.data.name, command);
      } else {
        console.warn(`El comando ${file} no tiene una propiedad 'data'`.red);
      }
    }).catch((error) => {
      console.error(`Error al cargar el comando ${file}: ${error.message}`.red);
    });
  }
});

const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  import(`./events/${file}`).then((eventModule) => {
    const event = eventModule.default || eventModule;
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }).catch((error) => {
    console.error(`Error al cargar el evento ${file}: ${error.message}`.red);
  });
}