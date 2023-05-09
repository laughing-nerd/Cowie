const { distube } = require("../../index.js");

module.exports = {
  name: "pause",
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      message.reply(
        "You cannot pause a song if you are not in a voice channel"
      );
    else if (!distube.getQueue(message))
      message.reply("Nothing to pause, the queue is empty");
    else if (distube.getQueue(message).paused)
      message.reply("Nothing to pause, the current song isn't playing");
    else {
      message.reply(":pause_button: Paused current song");
      distube.pause(message);
    }
  },
};
