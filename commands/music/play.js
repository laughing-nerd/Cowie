const { distube } = require("../../index.js");

module.exports = {
  name: "play",
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      message.reply("You must be connected to a voice channel to play music");
    else {
      const RequestedSong = args.join(" ");
      distube
        .play(message.member.voice.channel, RequestedSong, {
          member: message.member,
          textChannel: message.channel,
          message,
        })

        message.reply(":exclamation: " + RequestedSong + " has been added to the queue")
        .catch((err) => {
          if (err)
            message.reply(
              ":exclamation: Could not find the video url or something went wrong"
            );
        });
    }
  },
};
