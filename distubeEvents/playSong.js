const zello = require("zello");
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonComponent } = require('discord.js');

module.exports = {
  run: async (queue,song) => {
    const embed = new EmbedBuilder()
        .setColor(2829617)
        .setTitle("Now Playing...")
        .setDescription(song.name)
        .setThumbnail(song.thumbnail)
    queue.textChannel.send({ embeds: [embed] });
  },
};
