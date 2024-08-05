const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName('download-worlds')
  .setDescription('Despliega el menú para descargar los mapas de los servidores que se han jugado.'),
  
  run(client, interaction) {
    if (interaction.guildId == '846586184963981322') {
      const embed = new EmbedBuilder()
      .setColor(0x94bf63)
      .setAuthor({ name: 'AnchorBot - downloadwords', iconURL: 'https://cutt.ly/NC1VWyL' })
      .setTitle('<:Archivo:1010183980315840562> Enlaces de descarga:')
      .setDescription(`Aquí tienes la lista de los servidores que hemos jugado.`)
      .addFields
      (
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
}