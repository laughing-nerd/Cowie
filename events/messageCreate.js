const { Prefix } = require("../config.json");
const zello = require("zello");

module.exports = {
  run: async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
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
