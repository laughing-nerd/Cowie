const fetch = require("node-fetch");

module.exports = {
  name: "nsfw",
  description: "||Posts NSFW content. You must be in an NSFW channel to use this command. At your own risk||",
  run: async (client, message) => {
    if (message.channel.nsfw) {
	  const randomNumber = Math.floor(Math.random() * 2);
	  let type = (randomNumber==0) ? "neko" : "waifu"

      fetch(`https://api.waifu.pics/nsfw/${type}`)
        .then((res) => res.json())
        .then((data) => {
          message.channel.send(data.url);
        });
    } else {
      message.channel.send(
        `You must be in an NSFW channel to view this content:exclamation:`
      );
    }
  },
};
