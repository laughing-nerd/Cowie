const { Logs, GuildId, ChannelId } = require("../config.json");

module.exports = {
  run: async (client, guild) => {
    if (Logs.guildCreate == true) {
			const cowie_guild = await client.guilds.fetch(GuildId);
			const log_channel = cowie_guild.channels.cache.find(channel=> channel.id == ChannelId)
			log_channel.send(guild.name+" added me. YAY! :confetti_ball:")
    }
  },
};
