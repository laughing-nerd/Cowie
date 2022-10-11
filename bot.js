require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const redditFetch = require('reddit-fetch');
const { DisTube } = require('distube');
const fetch = require('node-fetch');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});
const distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    nsfw: true,
})

const PREFIX = "-"; //Sets the Command Prefix
const AnimeSubreddits = ['AnimeFunny', 'Animememes'];
const AnimeNames = [
    'Attack on Titan intro music',
    'Attack on Titan outro music',
    'Guilty crown intro music',
    'Guilty crown outro music',
    'Classroom of the Elite intro music',
    'Classroom of the Elite outro music',
    '86 intro music',
    '86 outro music',
    'Demon Slayer intro music',
    'Demon Slayer outro music',
    'Tokyo Ghoul intro music',
    'Tokyo Ghoul outro music',
    'Naruto bluebird music',
    'Random Anime music'
]
const cuteAnimePosts = ['cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'happy', 'wink', 'poke', 'dance'];


client.on('ready', () => {
    client.user.setActivity(`to ${PREFIX}help`, { type: ActivityType.Listening });
    console.log('Bot is online');

    console.log(client.guilds.cache.size);
});

//This sends a DM to me informing which discord server added Cowie
client.on('guildCreate', guild => {
    client.users.get('812753087545737217').send(guild.name + " added me! YAY!");
});

client.on('messageCreate', async (message) => {
    const msg = message.content.toLowerCase().trim();
    if (msg.startsWith(PREFIX)) {
        const command = msg.substring(PREFIX.length).split(" ");
        if (command[0] === 'waifu') {
            fetch('https://api.waifu.pics/sfw/waifu')
                .then(res => res.json())
                .then(data => {
                    message.channel.send(data.url);
                })
        }
        if (command[0] === 'waifu-nsfw') {
            if (message.channel.nsfw) {
                fetch('https://api.waifu.pics/nsfw/waifu')
                    .then(res => res.json())
                    .then(data => {
                        message.channel.send(data.url);
                    })
            }
            else
                message.channel.send(`You must be in an NSFW channel to view this content:exclamation:`);
        }
        if (command[0] === 'neko-nsfw') {
            if (message.channel.nsfw) {
                fetch('https://api.waifu.pics/nsfw/neko')
                    .then(res => res.json())
                    .then(data => {
                        message.channel.send(data.url);
                    })
            }
            else
                message.channel.send(`You must be in an NSFW channel to view this content:exclamation:`);
        }
        else if (command[0] === 'neko') {
            fetch('https://api.waifu.pics/sfw/neko')
                .then(res => res.json())
                .then(data => {
                    message.channel.send(data.url);
                })
        }
        else if (command[0] === 'quote') {
            fetch('https://animechan.vercel.app/api/random')
                .then(response => response.json())
                .then((quote) => {
                    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                    const embed = new EmbedBuilder();
                    embed.setColor(randomColor).setDescription('*"' + quote.quote + '"*').setAuthor(quote.character + ', ' + quote.anime);
                    message.channel.send({ embeds: [embed] });
                }
                )
        }
        else if (command[0] === 'meme') {
            const randomSubreddit = AnimeSubreddits[Math.floor(Math.random() * AnimeSubreddits.length)];
            redditFetch({
                subreddit: randomSubreddit,
                sort: 'hot',
                allowNSFW: true,
                allowModPost: true,
                allowCrossPost: true,
                allowVideo: true

            }).then(post => {
                const embed = new EmbedBuilder().setImage(post.url);
                message.channel.send({ embeds: [embed] });
            });
        }
        else if (command[0] === 'cute') {
            const randomCutePost = cuteAnimePosts[Math.floor(Math.random() * cuteAnimePosts.length)];
            fetch(`https://api.waifu.pics/sfw/${randomCutePost}`)
                .then(res => res.json())
                .then(data => {
                    const embed = new EmbedBuilder().setImage(data.url);
                    message.channel.send({ embeds: [embed] });
                })
        }
        else if (command[0] === 'play' && command.length > 1) {
            if (!message.member.voice.channel)
                message.reply("You must be connected to a voice channel to play music");
            else {
                message.reply("Searching for the song...");
                let RequestedSong = '';
                for (let i = 1; i < command.length; i++)
                    RequestedSong = RequestedSong + command[i];
                distube.play(message.member.voice.channel, RequestedSong, {
                    member: message.member,
                    textChannel: message.channel,
                    message
                });
            }
        }
        else if (command[0] == 'play') {
            if (!message.member.voice.channel)
                message.reply("You must be connected to a voice channel to play music");
            else {
                const songRandom = AnimeNames[Math.floor(Math.random() * AnimeNames.length)];
                message.channel.send('Searching for a song...');
                await distube.play(message.member.voice.channel, songRandom, {
                    member: message.member,
                    textChannel: message.channel,
                    message
                });
            }
        }
        else if (command[0] === 'stop') {
            if (!message.member.voice.channel)
                message.reply("You cannot stop a song if you are not in a voice channel");
            else if (!distube.getQueue(message))
                message.reply("Nothing to stop, the queue is empty");
            else {
                message.reply("Song Stopped :stop_sign:");
                distube.stop(message);
            }
        }
        else if (command[0] === 'skip') {
            if (!message.member.voice.channel)
                message.reply("You cannot skip a song if you are not in a voice channel");
            else if (!distube.getQueue(message))
                message.reply("Nothing to skip, the queue is empty");
            else {
                if (command.length == 1) {
                    message.reply(":white_check_mark: Skipped current song");
                    if (distube.getQueue(message).songs.length == 1)
                        distube.stop(message);
                    else
                        distube.skip(message);
                }
                else {
                    command.shift()
                    if (command[0] > distube.getQueue(message).songs.length || typeof (Number(command[0])) != 'number')
                        message.reply("That position does not exist. Cannot jump.");
                    else if (Number(command[0]) == 1)
                        message.reply("You are currently playing that song...");
                    else if (Number(command[0]) < 1) {
                        if (distube.getQueue(message).previousSongs.length < 1)
                            message.reply("There's no previous song");
                        else {
                            message.reply(":white_check_mark: Skipped current song");
                            distube.previous(message);
                        }
                    }
                    else {
                        message.reply(":white_check_mark: Skipped current song");
                        distube.jump(message, Number(command[0] - 1));
                    }
                }
            }
        }
        if (command[0] === "pause") {
            if (!message.member.voice.channel)
                message.reply("You cannot pause a song if you are not in a voice channel");
            else if (!distube.getQueue(message))
                message.reply("Nothing to pause, the queue is empty");
            else if(distube.getQueue(message).paused)
                message.reply("Nothing to pause, the current song isn't playing");
            else {
                message.reply(":pause_button: Paused current song");
                distube.pause(message);
            }
        }
        if (command[0] === "resume") {
            if (!message.member.voice.channel)
                message.reply("You cannot resume a song if you are not in a voice channel");
            else if (!distube.getQueue(message))
                message.reply("Nothing to resume, the queue is empty");
            else if(!distube.getQueue(message).paused)
                message.reply("Nothing to resume, the current song isn't paused");
            else {
                message.reply(":arrow_forward: Resuming");
                distube.resume(message);
            }
        }

        else if (command[0] === 'help') {
            const embed = new EmbedBuilder()
                .setTitle('Hello Senpai! I am Cowie and I am here to assist you')
                .addFields(
                    { name: PREFIX + 'waifu', value: 'Gives waifu pictures' },
                    { name: PREFIX + 'neko', value: 'Gives neko pictures' },
                    { name: PREFIX + 'quote', value: 'Gives a random anime quote' },
                    { name: PREFIX + 'meme', value: 'Gives a random anime meme' },
                    { name: PREFIX + 'cute', value: 'Cute wholesome anime posts' },
                    { name: PREFIX + 'play <Song_Name>', value: 'Plays the specified anime song. If only no <Song_Name> is provided then I\'ll play a random anime song' },
                    { name: PREFIX + 'skip', value: 'Skips the song' },
                    { name: PREFIX + 'pause', value: 'Pauses the song' },
                    { name: PREFIX + 'resume', value: 'Resumes the paused song' },
                    { name: PREFIX + 'stop', value: 'Stops the song and disconnects the bot from the voice channel' }
                    // { name: PREFIX + 'voice', value: 'Plays a random anime kawaii voice' },
                    // { name: '||' + PREFIX + 'waifu-nsfw||', value: '||Posts waifu NSFW content. You must be in an NSFW channel to use this command. At your own risk||' },
                    // { name: '||' + PREFIX + 'neko-nsfw||', value: '||Posts neko NSFW content. You must be in an NSFW channel to use this command. At your own risk||' }
                )

            message.channel.send({ embeds: [embed] });
            
        }

    }
});

distube.on('playSong', (queue, song) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const embed = new EmbedBuilder()
        .setColor(randomColor)
        .setTitle("Now Playing...")
        .setDescription(song.name)
        .setThumbnail(song.thumbnail)
    queue.textChannel.send({ embeds: [embed] })
})
distube.on('addSong', (queue, song) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const embed = new EmbedBuilder()
        .setColor(randomColor)
        .setTitle("New song added to the queue 👍")
    queue.textChannel.send({ embeds: [embed] });
})

client.login(process.env.BOT_TOKEN);

