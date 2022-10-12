require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonComponent } = require('discord.js');
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
});

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
        client.users.send("812753087545737217", guild.name+" added me! Yay!");
});
//This sends a DM to me informing which discord server kicked Cowie
client.on('guildDelete', guild => {
        client.users.send("812753087545737217", guild.name+" kicked me out :(");
});

client.on('messageCreate', async (message) => {
    const msg = message.content.trim();
    if (msg.startsWith(PREFIX)) {
        const command = msg.substring(PREFIX.length).split(" ");
        if (command[0].toLowerCase() === 'waifu') {
            fetch('https://api.waifu.pics/sfw/waifu')
                .then(res => res.json())
                .then(data => {
                    message.channel.send(data.url);
                })
        }
        if (command[0].toLowerCase() === 'waifu-nsfw') {
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
        if (command[0].toLowerCase() === 'neko-nsfw') {
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
        else if (command[0].toLowerCase() === 'neko') {
            fetch('https://api.waifu.pics/sfw/neko')
                .then(res => res.json())
                .then(data => {
                    message.channel.send(data.url);
                })
        }
        else if (command[0].toLowerCase() === 'quote') {
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
        else if (command[0].toLowerCase() === 'meme') {
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
        else if (command[0].toLowerCase() === 'cute') {
            const randomCutePost = cuteAnimePosts[Math.floor(Math.random() * cuteAnimePosts.length)];
            fetch(`https://api.waifu.pics/sfw/${randomCutePost}`)
                .then(res => res.json())
                .then(data => {
                    const embed = new EmbedBuilder().setImage(data.url);
                    message.channel.send({ embeds: [embed] });
                })
        }
        else if (command[0].toLowerCase() === 'play' && command.length > 1) {
            if (!message.member.voice.channel)
                message.reply("You must be connected to a voice channel to play music");
            else {
                message.reply("Searching for the song...");
                command.shift();
                const RequestedSong = command.join(" ");
                distube.play(message.member.voice.channel, RequestedSong, {
                    member: message.member,
                    textChannel: message.channel,
                    message
                })
                .catch(err=>{
                    if(err)
                        message.reply(":exclamation:Could not find the video url or something went wrong:exclamation:");
                });
            }
        }
        else if (command[0].toLowerCase() == 'play') {
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
        else if (command[0].toLowerCase() === 'stop') {
            if (!message.member.voice.channel)
                message.reply("You cannot stop a song if you are not in a voice channel");
            else if (!distube.getQueue(message))
                message.reply("Nothing to stop, the queue is empty");
            else {
                message.reply("Song Stopped :stop_sign:");
                distube.stop(message);
            }
        }
        else if (command[0].toLowerCase() === 'skip') {
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
        if (command[0].toLowerCase() === "pause") {
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
        if (command[0].toLowerCase() === "resume") {
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
        if (command[0].toLowerCase() === "repeat") {
            if (!message.member.voice.channel)
                message.reply("You cannot repeat a song if you are not in a voice channel");
            else if (!distube.getQueue(message))
                message.reply("Nothing to repeat, the queue is empty");
            else if(command.length==1)
                message.reply(`You must specify a repeat type...\n0-> No repeat\n1-> Repeat the current song\n2-> Repeat the queue\n`);
            else {
                if (parseInt(command[1])==0)
                    message.reply("Current Song/Queue will not repeat");
                else if(parseInt(command[1])==1)
                    message.reply("Current Song will now repeat");
                else if(parseInt(command[1])==2)
                    message.reply("Current Queue will now repeat");
                distube.setRepeatMode(message, parseInt(command[1]));
            }
        }
        if (command[0].toLowerCase() === "queue") {
            const queue = distube.getQueue(message);
            if (!queue)
                message.reply("Queue is empty");
            else {
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                const embed = new EmbedBuilder()
                    .setColor(randomColor)
                    .setTitle("Current queue:")
                    .setDescription(queue.songs.map((song, id) =>
                        `**${id + 1}**. [${song.name}] - \`${song.formattedDuration}\``
                    ).join("\n"))
                message.channel.send({ embeds: [embed] });
            }
        }

        else if (command[0].toLowerCase() === 'help') {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            const embed = new EmbedBuilder()
                .setTitle('Hello Senpai! I am Cowie and I am here to assist you')
                .setColor(randomColor)
                .addFields(
                    { name: PREFIX + 'waifu', value: 'Gives waifu pictures' },
                    { name: PREFIX + 'neko', value: 'Gives neko pictures' },
                    { name: PREFIX + 'quote', value: 'Gives a random anime quote' },
                    { name: PREFIX + 'meme', value: 'Gives a random anime meme' },
                    { name: PREFIX + 'cute', value: 'Cute wholesome anime posts' },
                    { name: PREFIX + 'play <Song_Name>', value: 'Plays the specified anime song. If only no <Song_Name> is provided then I\'ll play a random anime song' },
                    { name: PREFIX + 'skip', value: 'Skips the song. Skips <Number> will skip to the <Number> song in the queue. skip -1 will play the previous song' },
                    { name: PREFIX + 'pause', value: 'Pauses the song' },
                    { name: PREFIX + 'resume', value: 'Resumes the paused song' },
                    { name: PREFIX + 'stop', value: 'Stops the song and disconnects the bot from the voice channel' },
                    { name: PREFIX + 'repeat <Mode>', value: `if <Mode>=0, then the song/queue won't repeat. If <Mode>=1, then the current song will repeat. If <Mode>=2, then the entire playlist will repeat`},
                    { name: PREFIX + 'queue', value: 'Shows the current queue'}
                    // { name: '||' + PREFIX + 'waifu-nsfw||', value: '||Posts waifu NSFW content. You must be in an NSFW channel to use this command. At your own risk||' },
                    // { name: '||' + PREFIX + 'neko-nsfw||', value: '||Posts neko NSFW content. You must be in an NSFW channel to use this command. At your own risk||' }
                )
            const button1 = new ButtonBuilder().setURL("https://donatebot.io/checkout/1028661074838425611?buyer=812753087545737217").setLabel("Buy me a Coffee").setStyle(ButtonStyle.Link)
            const button2 = new ButtonBuilder().setURL("https://discord.com/api/oauth2/authorize?client_id=998632759339794632&permissions=8&scope=bot").setLabel("Add Cowie").setStyle(ButtonStyle.Link);
            const button3 = new ButtonBuilder().setURL("https://discord.gg/WGzUny3guE").setLabel("Join Cowie's Support Server").setStyle(ButtonStyle.Link);
            const action = new ActionRowBuilder().addComponents(button1, button2, button3);

            message.channel.send({ embeds: [embed], components: [action] });
            
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
    queue.textChannel.send({ embeds: [embed] });
});
distube.on('addSong', (queue, song) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const embed = new EmbedBuilder()
        .setColor(randomColor)
        .setTitle("New song added to the queue 👍")
    queue.textChannel.send({ embeds: [embed] });
});

client.login(process.env.BOT_TOKEN);

