const { distube } = require("../../index.js");
const { AnimeNames } = require("../../data.json");
const { PREFIX } = require('../../data.json');
module.exports = {
  name: "play",
  description: `Plays the specified song. Use: ${PREFIX}play SongName. If no SongName is provided, then it will play a random anime song`,
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      message.reply("You must be connected to a voice channel to play music");
    else{
			let RequestedSong = '';
			if(args.length==0){
				RequestedSong = AnimeNames[Math.floor(Math.random() * AnimeNames.length)];
			}
			else{
				RequestedSong = args.join(" ");
			}

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
