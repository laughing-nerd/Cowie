const { distube } = require("../../index.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "queue",
  description: "Shows the current queue",
  run: async (client, message, args) => {
    const queue = distube.getQueue(message);
    if (!queue) message.reply("Queue is empty");
    else {
      const embed = new EmbedBuilder()
        .setColor(2829617)
        .setTitle("Current queue:")
        .setDescription(
          queue.songs
            .map(
              (song, id) =>
                `**${id + 1}**. [${song.name}] - \`${song.formattedDuration}\``
            )
            .join("\n")
        );
      message.channel.send({ embeds: [embed] });
    }
  },
};
