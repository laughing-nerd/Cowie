// Packages
require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { DisTube } = require("distube");
const redditFetch = require("reddit-fetch");
fetch = require("node-fetch");
zello = require("zello");

// Configs & Data
const { AnimeSubreddits, AnimeNames, AnimePosts } = require("./data.json");
const Config = require("./config.json");

// Important Variables
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
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
client.helpCommands = []

for (let x of ["Commands", "Events", "Distube"]) require(`./modules/handle${x}`)(client);

client.login(process.env.TOKEN).catch((e) => zello.error(e));
