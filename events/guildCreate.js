const { Logs, OwnerId } = require("../config.json");
const { ActivityType } = require("discord.js");
const zello = require("zello");

module.exports = {
  run: async (client, guild) => {
    if (Logs.guildCreate == true) {
      client.users.send(toString(OwnerId), `New Server: ${guild.name}`);
      zello.success(`New Server: ${guild.name}`);
    }
  },
};
