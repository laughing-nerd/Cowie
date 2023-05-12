const { distube } = require("../../index.js");

module.exports = {
  name: "resume",
  description: "Resumes the paused song",
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      message.reply(
        "You cannot resume a song if you are not in a voice channel"
      );
    else if (!distube.getQueue(message))
      message.reply("Nothing to resume, the queue is empty");
    else if (!distube.getQueue(message).paused)
      message.reply("Nothing to resume, the current song isn't paused");
    else {
      message.reply(":arrow_forward: Resuming");
      distube.resume(message);
    }
  },
};
