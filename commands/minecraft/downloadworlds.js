import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

export const data = new SlashCommandBuilder()
.setName('download-worlds')
.setDescription('Despliega el menú para descargar los mapas de los servidores que se han jugado.')

export function run(client, interaction) {
  if (interaction.guildId == '846586184963981322') {
    const embed = new EmbedBuilder()
    .setColor(0x94bf63)
    .setAuthor({ name: 'AnchorBot - downloadworlds', iconURL: 'https://cdn.discordapp.com/attachments/1008268794612957184/1019572125058740224/AnchorIcon.png?ex=66bd3f49&is=66bbedc9&hm=b1cb9e586864767c57265dd8ab9afdaa2f10fee3ea946e56aa7309e86b788323&'})
    .setTitle('<:Archivo:1010183980315840562> Enlaces de descarga:')
    .setDescription(`Aquí tienes la lista de los servidores que hemos jugado.`)
    .addFields(
      { name: `<:GrassBlock:1013216370839797871> SMP v1╏1.16.5`, value: `[Link de descarga](https://mega.nz/folder/WuowFA5b#SK_LOJPmrP7aT2aQZUK94w).`, inline: true },
      { name: `<:GrassBlock:1013216370839797871> SMP v2╏1.16.5`, value: `[Link de descarga](https://mega.nz/folder/T64WEBwK#RznA0zRt0yedegFTv62QAA).`, inline: true },
      { name: `<:GrassBlock:1013216370839797871> SMP v3╏1.16.5`, value: `[Link de descarga](https://mega.nz/folder/evZQxJjD#eFgaBcny-Zyt5XfOqJW_Dg).`, inline: true },
      { name: `<:Forge:1007888017102487572> SMP Mods V1╏1.12.2 Curseforge`, value: `[Link de descarga](https://mega.nz/folder/O7BmDACJ#1wf_JLFST4XC0rk42xPx_A).`, inline: true }
    )
    interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
  }
  
  else {
    interaction.reply({ content: "<:Advertencia:1009954893471162470> Lo siento, este comando no está disponible en este servidor.", allowedMentions: { repliedUser: false } })
  }
}