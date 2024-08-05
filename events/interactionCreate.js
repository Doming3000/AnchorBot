const discord = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
    name: 'interactionCreate',
    once: false,
    
    /**
    * @param {discord.Interaction} interaction 
    * @param {discord.Client} client
    */
    execute(interaction, client) {
        let cmd = client.commands.find((c) => (c.data.name === interaction.commandName));
        
        if(cmd != null &&interaction.isChatInputCommand()) {
            // Block bots
            if(interaction.user.bot) {
                return;
            }
            cmd.run(client, interaction);
        }
    }
};