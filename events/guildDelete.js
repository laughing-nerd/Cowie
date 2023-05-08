const { Logs, OwnerId } = require("../config.json");
const { ActivityType } = require("discord.js");
const zello = require("zello");

module.exports = {
  run: async (client, guild) => {
    if (Logs.guildDelete == true) {
      client.users.send(
        toString(OwnerId),
        `Removed from server: ${guild.name}`
      );
      zello.warning(`Removed from server: ${guild.name}`);
    }
  },
};
