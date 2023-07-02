// Packages
require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { DisTube } = require("distube");
fetch = require("node-fetch");
zello = require("zello");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.GuildMembers
  ],
});

module.exports.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  nsfw: true,
});

client.commands = new Collection();
client.aliases = new Collection();
client.welcome = new Collection();
client.helpCommands = []

for (let x of ["Commands", "Events", "Distube"]) require(`./modules/handle${x}`)(client);

client.login(process.env.TOKEN).catch((e) => zello.error(e));
