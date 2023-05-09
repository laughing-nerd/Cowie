const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActivityType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ButtonComponent,
} = require("discord.js");
const { Prefix } = require("../../config.json");

module.exports = {
  name: "help",
  run: async (client, message) => {
    const embed = new EmbedBuilder();

    embed
      .setColor(2829617)
      .setTitle("Cowie")
      .setURL("https://github.com/laughing-nerd/")
      .setDescription(
        "This is Cowie, a discord anime bot for all the weebs as well as the non-weebs out there! Besides anime content, Cowie can play music as well. Moderation features are yet not there but will be added in future updates."
      )
      .addFields(
        { name: Prefix + "waifu", value: "Gives waifu pictures", inline: true },
        { name: Prefix + "neko", value: "Gives neko pictures", inline: true },
        {
          name: Prefix + "quote",
          value: "Gives a random anime quote",
          inline: true,
        },
        {
          name: Prefix + "meme",
          value: "Gives a random anime meme",
          inline: true,
        },
        {
          name: Prefix + "cute",
          value: "Cute wholesome anime posts",
          inline: true,
        },
        {
          name: Prefix + "play <Song_Name>",
          value:
            "Plays the specified anime song. If only no <Song_Name> is provided then I'll play a random anime song",
          inline: true,
        },
        {
          name: Prefix + "skip",
          value:
            "Skips the song. Skips <Number> will skip to the <Number> song in the queue. skip -1 will play the previous song",
          inline: true,
        },
        { name: Prefix + "pause", value: "Pauses the song" },
        { name: Prefix + "resume", value: "Resumes the paused song" },
        {
          name: Prefix + "stop",
          value:
            "Stops the song and disconnects the bot from the voice channel",
          inline: true,
        },
        {
          name: Prefix + "repeat <Mode>",
          value: `if <Mode>=0, then the song/queue won't repeat. If <Mode>=1, then the current song will repeat. If <Mode>=2, then the entire playlist will repeat`,
          inline: true,
        },
        {
          name: Prefix + "queue",
          value: "Shows the current queue",
          inline: true,
        },
        {
          name: "||" + Prefix + "waifu-nsfw||",
          value:
            "||Posts waifu NSFW content. You must be in an NSFW channel to use this command. At your own risk||",
          inline: true,
        },
        {
          name: "||" + Prefix + "neko-nsfw||",
          value:
            "||Posts neko NSFW content. You must be in an NSFW channel to use this command. At your own risk||",
          inline: true,
        }
      );
    const button1 = new ButtonBuilder()
      .setURL(
        "https://donatebot.io/checkout/1028661074838425611?buyer=812753087545737217"
      )
      .setLabel("Buy me a Coffee")
      .setStyle(ButtonStyle.Link);
    const button2 = new ButtonBuilder()
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=998632759339794632&permissions=8&scope=bot"
      )
      .setLabel("Add Cowie")
      .setStyle(ButtonStyle.Link);
    const button3 = new ButtonBuilder()
      .setURL("https://discord.gg/WGzUny3guE")
      .setLabel("Join Cowie's Support Server")
      .setStyle(ButtonStyle.Link);
    const action = new ActionRowBuilder().addComponents(
      button1,
      button2,
      button3
    );

    message.channel.send({ embeds: [embed], components: [action] });
  },
};
