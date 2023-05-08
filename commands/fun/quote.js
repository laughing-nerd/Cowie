const fetch = require("node-fetch");
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonComponent } = require('discord.js');

module.exports = {
  name: "quote",
  run: async (client, message) => {
    fetch("https://animechan.vercel.app/api/random")
      .then((response) => response.json())
      .then((quote) => {
        const embed = new EmbedBuilder();
        quoteReceived = '*"' + quote.quote + '"*';
        quoteAuthor = quote.character + ", " + quote.anime;

        embed
          .setColor(2829617)
          .setDescription(quoteReceived)
          .setAuthor({ name: quoteAuthor });
        message.channel.send({ embeds: [embed] });
      });
  },
};
