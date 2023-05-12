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
  description: "Lists all available commands",
  run: async (client, message) => {
    const embed = new EmbedBuilder();

    embed
      .setColor(2829617)
      .setTitle("Cowie")
      .setURL("https://github.com/laughing-nerd/Cowie");
    embed.setDescription(
      `This is Cowie, a discord anime bot for all the weebs as well as the non-weebs out there! Besides anime content, Cowie can play music as well. Moderation features are yet not there but will be added in future updates. My prefix is currently \`${Prefix}\``
    );

    const commands = client.helpCommands

    commands.forEach((command) => {
      embed.addFields({
        name: command.name,
        value: command.description,
        inline: true,
      });
    });

    const B1 = new ButtonBuilder()
      .setURL(
        "https://donatebot.io/checkout/1028661074838425611?buyer=812753087545737217" 
      )
      .setLabel("Buy me a Coffee")
      .setStyle(ButtonStyle.Link);

    const B2 = new ButtonBuilder()
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=998632759339794632&permissions=8&scope=bot"
      )
      .setLabel("Add Cowie")
      .setStyle(ButtonStyle.Link);

    const B3 = new ButtonBuilder()
      .setURL("https://discord.gg/WGzUny3guE")
      .setLabel("Join Cowie's Support Server")
      .setStyle(ButtonStyle.Link);

    message.channel.send({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(B1, B2, B3)],
    });
  },
};
