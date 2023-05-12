const { distube } = require("../../index.js");

module.exports = {
  name: "skip",
  description: "Skips the current song.",
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      message.reply("You cannot skip a song if you are not in a voice channel");
    else if (!distube.getQueue(message))
      message.reply("Nothing to skip, the queue is empty");
    else {
      if (command.length == 1) {
        message.reply(":white_check_mark: Skipped current song");
        if (distube.getQueue(message).songs.length == 1) distube.stop(message);
        else distube.skip(message);
      } else {
        if (
          command[0] > distube.getQueue(message).songs.length ||
          typeof Number(args[0]) != "number"
        )
          message.reply("That position does not exist. Cannot jump.");
        else if (Number(args[0]) == 1)
          message.reply("You are currently playing that song...");
        else if (Number(args[0]) < 1) {
          if (distube.getQueue(message).previousSongs.length < 1)
            message.reply("There's no previous song");
          else {
            message.reply(":white_check_mark: Skipped current song");
            distube.previous(message);
          }
        } else {
          message.reply(":white_check_mark: Skipped current song");
          distube.jump(message, Number(args[0] - 1));
        }
      }
    }
  },
};
