const { distube } = require("../index.js");
const { readdirSync } = require("fs");
const zello = require("zello");

module.exports = (client) => {
  const commands = readdirSync("./distubeEvents").filter((file) =>
    file.endsWith(".js")
  );
  for (let file of commands) {
    try {
      let pull = require(`../distubeEvents/${file}`);

      distube.on(file.replace(".js", ""), pull.run.bind(null))
    } catch (e) {
      zello.error(e);
    }
  }
};
