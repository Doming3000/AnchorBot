const discord = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  
  /**
  * @param {discord.Client} client
  */
  
  execute(client) {
    console.log('¡En línea!'.yellow)
  }
};