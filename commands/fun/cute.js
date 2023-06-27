const fetch = require("node-fetch");
const { AnimePosts } = require("../../data.json");
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonComponent } = require('discord.js');

module.exports = {
  name: "cute",
  description: "Cute wholesome anime posts",
  run: async (client, message) => {
    const randomCutePost = AnimePosts[Math.floor(Math.random() * AnimePosts.length)];
    fetch(`https://api.waifu.pics/sfw/${randomCutePost}`)
        .then(res => res.json())
        .then(data => {
			let randomColor="";
			try{
				randomColor = Math.floor(Math.random() * 16777215).toString(16);
			}
			catch(error){
				randomColor = "ff0000";
			}
            const embed = new EmbedBuilder().setImage(data.url).setColor("ff0000");
            message.channel.send({ embeds: [embed] });
        })
  },
};
