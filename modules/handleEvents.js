const { readdirSync } = require("fs");
const zello = require("zello");

module.exports = (client) => {
  const commands = readdirSync("./events").filter((file) =>
    file.endsWith(".js")
  );
  for (let file of commands) {
    try {
      let pull = require(`../events/${file}`);

      client.on(file.replace(".js", ""), pull.run.bind(null, client));
    } catch (e) {
      zello.error(e);
    }
  }
};
