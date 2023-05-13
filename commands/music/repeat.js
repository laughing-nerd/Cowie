const { distube } = require("../../index.js");

module.exports = {
  name: "repeat",
  description: "Repeats the current song",
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      message.reply(
        "You cannot repeat a song if you are not in a voice channel"
      );
    else if (!distube.getQueue(message))
      message.reply("Nothing to repeat, the queue is empty");
    else if (command.length == 1)
      message.reply(
        `You must specify a repeat type...\n0-> No repeat\n1-> Repeat the current song\n2-> Repeat the queue\n`
      );
    else {
      if (parseInt(command[1]) == 0)
        message.reply("Current Song/Queue will not repeat");
      else if (parseInt(command[1]) == 1)
        message.reply("Current Song will now repeat");
      else if (parseInt(command[1]) == 2)
        message.reply("Current Queue will now repeat");
      distube.setRepeatMode(message, parseInt(command[1]));
    }
  },
};
