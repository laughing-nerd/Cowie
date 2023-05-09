const fetch = require("node-fetch");

module.exports = {
  name: "neko",
  run: async (client, message) => {
    fetch("https://api.waifu.pics/sfw/neko")
      .then((res) => res.json())
      .then((data) => {
        message.channel.send(data.url);
      });
  },
};
