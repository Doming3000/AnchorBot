export const name = 'interactionCreate';
export const once = false;

export function execute(interaction, client) {
  let cmd = client.commands.find((c) => (c.data.name === interaction.commandName));
  
  if (cmd != null && interaction.isChatInputCommand()) {
    // Block bots
    if (interaction.user.bot) {
      return;
    }
    cmd.run(client, interaction);
  }
}