import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

export const data = new SlashCommandBuilder()
  .setName('botping')
  .setDescription('Muestra la latencia del bot.')
  
export function run(client, interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x779ecb)
    .setAuthor({ name: 'AnchorBot - botping', iconURL: 'https://cutt.ly/NC1VWyL' })
    .setThumbnail('https://cutt.ly/gC1VJ8T')
    .setTitle('🏓 ¡Pong!')
    .setDescription(`- 📡 Mi ping actual es \`${client.ws.ping}ms\`.`)
  interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
}