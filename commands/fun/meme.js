const fetch = require("node-fetch");
const { AnimeSubreddits, AnimeNames, AnimePosts } = require("../../data.json");
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonComponent } = require('discord.js');
const redditFetch = require("reddit-fetch");

module.exports = {
  name: "meme",
  description: "Gives a random anime meme",
  run: async (client, message) => {
    const randomSubreddit =
      AnimeSubreddits[Math.floor(Math.random() * AnimeSubreddits.length)];
    redditFetch({
      subreddit: randomSubreddit,
      sort: "hot",
      allowNSFW: true,
      allowModPost: true,
      allowCrossPost: true,
      allowVideo: true,
    }).then((post) => {
      const embed = new EmbedBuilder().setImage(post.url).setColor(2829617);
      message.channel.send({ embeds: [embed] });
    });
  },
};
