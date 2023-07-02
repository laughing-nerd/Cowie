const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");
const { tickle_text } = require("../../data.json");

module.exports = {
	name: "tickle",
	description: "tickle a user",
	run: async (client, message, args)=>{
		if(args.length==0){
			message.channel.send("You can't tickle nobody. Mention a user to tickle them");
			return;
		}

		const url = "https://api.otakugifs.xyz/gif?reaction=tickle";
		fetch(url).then(response=>response.json())
		.then(data=>{
				const user1 = "<@"+message.member.id+">";
				const user2 = args[0];

				const RandomIndex = Math.floor(Math.random()*tickle_text.length);
				let text = tickle_text[RandomIndex];
				text=text.replace("<1>", user1);
				text=text.replace("<2>", user2);

						let randomColor = Math.floor(Math.random() * 16777215).toString(16);
						randomColor = randomColor.padEnd(6, '0');
				const embed = new EmbedBuilder()
				.setColor(randomColor)
				.setDescription(text)
				.setImage(data.url);
				message.channel.send({ embeds:[embed] });
		});

		
	}
}
