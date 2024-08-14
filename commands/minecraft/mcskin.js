import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import request from "request";

export const data = new SlashCommandBuilder()
.setName('mcskin')
.setDescription('Muestra la skin de un jugador de Minecraft premium.')
.addStringOption(option => 
  option.setName('nombre')
  .setDescription('Nick del jugador premium.')
  .setRequired(true)
);

export function run(client, interaction) {
  const nombre = interaction.options.getString('nombre');
  
  const caracteres = nombre.length;
  if (caracteres > 16) {
    interaction.reply({ content: "<:Advertencia:1009954893471162470> El nombre de este jugador sobrepasa los 16 caracteres.", ephemeral: true, allowedMentions: { repliedUser: false }});
    return;
  }
  
  let mojang_player_api = `https://api.mojang.com/users/profiles/minecraft/${nombre}`;
  request(mojang_player_api, function (err, resp, body) {
    // Si hay un error con la solicitud, enviar un mensaje de error.
    if (err) {
      interaction.reply({ content: "<:Advertencia:1009954893471162470> Ocurrió un error al consultar la API.", ephemeral: true, allowedMentions: { repliedUser: false }});
      return;
    }
    
    try {
      body = JSON.parse(body);
      
      // Verificar si el jugador no existe
      if (!body || !body.id) {
        interaction.reply({ content: "<:Advertencia:1009954893471162470> No he podido encontrar al jugador.", ephemeral: true, allowedMentions: { repliedUser: false }});
        return;
      }
      
      let player_id = body.id;
      let render = `https://mc-heads.net/body/${player_id}/128.png`;
      let skin = `https://crafatar.com/skins/${player_id}.png`;
      let avatar = `https://mc-heads.net/avatar/${player_id}.png`;
      
      let embed = new EmbedBuilder()
      .setColor(0x94bf63)
      .setAuthor({ name: 'AnchorBot - mcskin', iconURL: 'https://cdn.discordapp.com/attachments/1008268794612957184/1019572125058740224/AnchorIcon.png?ex=66bd3f49&is=66bbedc9&hm=b1cb9e586864767c57265dd8ab9afdaa2f10fee3ea946e56aa7309e86b788323&'})
      .setTitle(`Skin del jugador: ${body.name}`)
      .setDescription(`<:Archivo:1010183980315840562> [Ver skin](${skin})`)
      .setImage(render)
      .setThumbnail(avatar);
      
      interaction.reply({ 
        embeds: [embed], 
        allowedMentions: { repliedUser: false } 
      });
      
    } catch (err) {
      interaction.reply({ content: "<:Advertencia:1009954893471162470> No he podido encontrar al jugador.", ephemeral: true, allowedMentions: { repliedUser: false }});
    }
  });
}