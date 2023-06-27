require('dotenv').config();
const { Prefix } = require('../../config.json');
const mongoclient = require('../../dbConnect.js');

module.exports = {
	name: "welcome",
	description: `**(BETA)**\nUsage: ${Prefix}welcome set #Channel-Name Welcome_Message(optional)\nfor me to greet new users in #Channel-Name upon joining. Replace Channel-Name with your desired text channel.`,
	run: async(client, message, args)=>{
		const guildID = message.guild.id;

		if(args.length>1)
		{
			if(args[0] == 'set')
			{
				const guild_status = channelID = client.welcome.get(guildID);
				if(guild_status == undefined)
				{
					const channel_id = args[1].substring(2, args[1].length-1);
					args.splice(0,2);
					let welcome_message="welcome <user> :grin:";
					if(args.length!=0)
						welcome_message=args.join(" ");

					message.channel.send(`:ballot_box_with_check: I will now send welcome messages in <#${channel_id}> channel`);
					client.welcome.set(guildID, channel_id);
					await mongoclient.db('cowie-welcome').collection('welcomedata').insertOne({
						_id: guildID,
						channelID: channel_id,
						msg: welcome_message
					});
				}
				else
					message.channel.send(`I am configured to send welcome messages in <#${channelID}> \n If you want to stop me from welcoming new members, do ${Prefix}welcome unset`)
			}
		}
		else
		{
			if(args[0] == 'unset')
			{
				const channel_id = client.welcome.get(guildID).channelid;
				if (channel_id == undefined)
					message.channel.send("You haven't configured me to send welcome messgaes in this server");
				else
				{
					client.welcome.delete(guildID);
					await mongoclient.connect();
					await mongoclient.db('cowie-welcome').collection('welcomedata').deleteOne({_id:guildID});
					message.channel.send(":stop_sign: I will stop sending welcome messages :stop_sign:");
				}
			}
		}
	}
};
