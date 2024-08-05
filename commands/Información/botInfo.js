import { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, EmbedBuilder, ComponentType } from 'discord.js';
import { version as discordVersion } from 'discord.js';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Función para contar los archivos de comandos en subdirectorios
function countCommandFiles(dir) {
  let fileCount = 0;
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      fileCount += countCommandFiles(filePath);
    } else if (file.endsWith('.js')) {
      fileCount++;
    }
  });
  
  return fileCount;
}

// Contar la cantidad de comandos dinámicamente
const commandCount = countCommandFiles('./commands');

// Obtener la versión de Node.js
const nodeVersion = process.version;

const data = new SlashCommandBuilder()
.setName('botinfo')
.setDescription('Despliega el menú de ayuda.');

async function run(client, interaction) {
  const uptime = Math.floor((new Date().getTime() - client.uptime) / 1000);
  
  if (interaction.commandName === 'botinfo') {
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('showcommands')
      .setEmoji('<:Lista:1027546321822961714>')
      .setLabel('Mis comandos')
      .setStyle('Secondary')
    );
    
    const embed0 = new EmbedBuilder()
    .setColor(0x779ecb)
    .setAuthor({ name: 'AnchorBot - botinfo', iconURL: 'https://cutt.ly/NC1VWyL' })
    .setThumbnail('https://cutt.ly/aC1VDEo')
    .setTitle("🔎 Menú de ayuda:")
    .setDescription(`**¡Hola! Me llamo Anchor <:Ancla:1007823996538060820>**\nSoy una integración privada creada para la **Galactic Crew ☕**.\nFui puesta en línea <t:${uptime}:R> y cuento con **${commandCount}** comandos.`)
    .addFields(
      { name: "📚 - Versiones", value: `➜ <:Discord:1013285425412046929> **Discord.js**: \`${discordVersion}\`\n➜ <:Nodejs:1013283193484484608> **Node.js**: \`${nodeVersion}\``, inline: true },
      { name: "📃 - Información Adicional:", value: "➜ <:Code:1029920233038827610> **Lenguaje**: Javascript", inline: true });
      
      const embed1 = new EmbedBuilder()
      .setColor(0x779ecb)
      .setThumbnail('https://cutt.ly/SBfLjsB')
      .setTitle("Mis comandos:")
      .setFooter({ text: "¡Haz click en cualquiera! 📅", iconURL: "https://cutt.ly/NC1VWyL" })
      .setTimestamp()
      .addFields(
        { name: "📑 Información:", value: " </botinfo:1019448323683393657> </botping:1019448323683393658>" },
        { name: "<:GrassBlock:1013216370839797871> Minecraft:", value: "</download-worlds:1018945516802953337> </mcskin:1017172584267264100>" }
      );
      
      let message = await interaction.reply({ embeds: [embed0], components: [row], allowedMentions: { repliedUser: false } });
      
      const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button });
      
      collector.on('collect', async (i) => {
        if (i.customId === 'showcommands') {
          i.reply({ embeds: [embed1], ephemeral: true, allowedMentions: { repliedUser: false } });
        }
      });
    }
  }
  
  export { data, run };