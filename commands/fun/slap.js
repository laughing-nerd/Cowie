const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");
const { slap_text } = require("../../data.json");

module.exports = {
	name: "slap",
	description: "Slaps a user",
	run: async (client, message, args)=>{
		if(args.length==0){
			message.channel.send("You can't slap nobody. Mention someone whom you want to slap");
			return;
		}

		const url = "https://api.otakugifs.xyz/gif?reaction=smack";
		fetch(url).then(response=>response.json())
		.then(data=>{
				const user1 = "<@"+message.member.id+">";
				const user2 = args[0];

				const RandomIndex = Math.floor(Math.random()*slap_text.length);
				let text = slap_text[RandomIndex];
				text=text.replace("<1>", user1);
				text=text.replace("<2>", user2);

				let randomColor="";
				try{
					randomColor = Math.floor(Math.random() * 16777215).toString(16);
				}
				catch(error){
					randomColor = "ff0000";
				}
				console.log(randomColor);
				const embed = new EmbedBuilder()
				.setColor(randomColor)
				.setDescription(text)
				.setImage(data.url);
				message.channel.send({ embeds:[embed] });
		});

		
	}
}
