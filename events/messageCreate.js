const { Prefix } = require("../config.json");
const { MessageEmbed } = require('discord.js')

module.exports = {
  run: async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    // If someone mentions cowie, cowie will reply with the help command (prefix and list of commands)
    if (message.mentions.has(client.user)) {
      let command = client.commands.get('help');
      if (command) command.run(client, message);
    }

    if (!message.content.startsWith(Prefix)) return;

    if (!message.member)
      message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(Prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
  },
};
