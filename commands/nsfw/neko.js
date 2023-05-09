const fetch = require("node-fetch");

module.exports = {
  name: "neko-nsfw",
  run: async (client, message) => {
    if (message.channel.nsfw) {
      fetch("https://api.waifu.pics/nsfw/neko")
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
