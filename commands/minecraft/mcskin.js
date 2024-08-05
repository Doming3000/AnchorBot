const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const request = require("request")

module.exports = {
  data: new SlashCommandBuilder()
  .setName('mcskin')
  .setDescription('Muestra la skin de un jugador de Minecraft premium.')
  .addStringOption(option =>
    option.setName('nombre')
    .setDescription('Nick del jugador premium.')
    .setRequired(true)),
    
    run(client, interaction) {
      const nombre = interaction.options.getString('nombre');
      
      const caracteres = nombre.length
      if (caracteres > 16) {
        interaction.reply({ content: "<:Advertencia:1009954893471162470> El nombre de este jugador sobrepasa los 16 caracteres.", allowedMentions: { repliedUser: false } })
        return;
      }
      
      let mojang_player_api = `https://api.mojang.com/users/profiles/minecraft/${nombre}`
      request(mojang_player_api, function (err, resp, body) {
        
        try {
          body = JSON.parse(body)
          let player_id = body.id
          let render = `https://mc-heads.net/body/${player_id}/128.png`
          let skin = `https://crafatar.com/skins/${player_id}.png`
          let avatar = `https://mc-heads.net/avatar/${player_id}.png`
          
          let embed = new EmbedBuilder()
          .setColor(0x94bf63)
          .setAuthor({ name: 'AnchorBot - mcskin', iconURL: 'https://cutt.ly/NC1VWyL' })
          .setTitle(`Skin del jugador: ${body.name}`)
          .setDescription(`<:Archivo:1010183980315840562> [Ver skin completa](${skin})`)
          .setImage(render)
          .setThumbnail(avatar)
          interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
          
        } catch (err) {
          interaction.reply({ content: "<:Advertencia:1009954893471162470> No he podido encontrar al jugador.", allowedMentions: { repliedUser: false } })
        }
      })
    }
  }