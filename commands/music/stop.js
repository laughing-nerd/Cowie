const { distube } = require("../../index.js");

module.exports = {
  name: "stop",
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      message.reply("You cannot stop a song if you are not in a voice channel");
    else if (!distube.getQueue(message))
      message.reply("Nothing to stop, the queue is empty");
    else {
      message.reply(":stop_sign: Song Stopped");
      distube.stop(message);
    }
  },
};
