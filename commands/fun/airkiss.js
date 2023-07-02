const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");
const { airkiss_text } = require("../../data.json");

module.exports = {
	name: "airkiss",
	description: "Sends an airkiss to a member",
	run: async (client, message, args)=>{
		if(args.length==0){
			message.channel.send("You can't send an airkiss to nobody. Mention someone whom you want to send an airkiss");
			return;
		}

		const url = "https://api.otakugifs.xyz/gif?reaction=airkiss";
		fetch(url).then(response=>response.json())
			.then(data=>{
				const user1 = "<@"+message.member.id+">";
				const user2 = args[0];

				const RandomIndex = Math.floor(Math.random()*airkiss_text.length);
				let text = airkiss_text[RandomIndex];
				text=text.replace("<1>", user1);
				text=text.replace("<2>", user2);

				let randomColor = Math.floor(Math.random() * 16777215).toString(16);
				randomColor = randomColor.padEnd(6, '0');

				console.log(randomColor);
				const embed = new EmbedBuilder()
				.setColor(randomColor)
				.setDescription(text)
				.setImage(data.url);
				message.channel.send({ embeds:[embed] });
		});

		
	}
}
