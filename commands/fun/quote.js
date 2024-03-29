const fetch = require("node-fetch");
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonComponent } = require('discord.js');

module.exports = {
  name: "quote",
  description: "Gives a random anime quote",
  run: async (client, message) => {
    fetch("https://katanime.vercel.app/api/getrandom")
      .then((response) => response.json())
      .then((data) => {
		const quote_list = data.result;
		const random_index = Math.floor(Math.random() * quote_list.length)
		console.log(random_index);
		console.log(quote_list[random_index])
		const quote = quote_list[random_index]

		let randomColor = Math.floor(Math.random() * 16777215).toString(16);
		randomColor = randomColor.padEnd(6, '0');
        
		const embed = new EmbedBuilder();
        quoteReceived = '*"' + quote.english + '"*';
        quoteAuthor = quote.character + ", " + quote.anime;

        embed
          .setColor(randomColor)
          .setDescription(quoteReceived)
          .setAuthor({ name: quoteAuthor });
        message.channel.send({ embeds: [embed] });
      });
  },
};
