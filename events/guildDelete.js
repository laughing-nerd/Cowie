const { Logs, GuildId, ChannelId } = require("../config.json");

module.exports = {
  run: async (client, guild) => {
    if (Logs.guildDelete == true) {
			const cowie_guild = await client.guilds.fetch(GuildId);
			const log_channel = cowie_guild.channels.cache.find(channel=> channel.id == ChannelId)
			log_channel.send(guild.name+" kicked me out :sob:")
    }
  },
};
