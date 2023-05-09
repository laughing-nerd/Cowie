const fetch = require("node-fetch");

module.exports = {
  name: "waifu",
  run: async (client, message) => {
    fetch("https://api.waifu.pics/sfw/waifu")
      .then((res) => res.json())
      .then((data) => {
        message.channel.send(data.url);
      });
  },
};
