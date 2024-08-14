import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

export const data = new SlashCommandBuilder()
.setName('botping')
.setDescription('Muestra la latencia del bot.')

export function run(client, interaction) {
  const embed = new EmbedBuilder()
  .setColor(0x779ecb)
  .setAuthor({ name: 'AnchorBot - botping', iconURL: 'https://cdn.discordapp.com/attachments/1008268794612957184/1019572125058740224/AnchorIcon.png?ex=66bd3f49&is=66bbedc9&hm=b1cb9e586864767c57265dd8ab9afdaa2f10fee3ea946e56aa7309e86b788323&'})
  .setThumbnail('https://cutt.ly/gC1VJ8T')
  .setTitle('🏓 ¡Pong!')
  .setDescription(`- 📡 Mi ping actual es \`${client.ws.ping}ms\`.`)
  interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
}