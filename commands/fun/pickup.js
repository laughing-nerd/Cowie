const { ConnectionService } = require("discord.js");

module.exports = {
	name: "pickup",
	description: "Gives a random pickup line. You can even specify a user to whom you want to dedicate a pickup line!",
	run: async(client, message, args) =>{
		let toUser="";
		if(args.length>0)
			toUser = args[0];
		const url = "https://pickup-api.vercel.app/pickup";
		fetch(url)
		.then(response=>response.json())
		.then(data=>{
				const keys = Object.keys(data);
				const pickupline = data[keys[ keys.length * Math.random() << 0]]
				if(toUser.length==0)
					message.reply(pickupline);
				else
					message.reply(`Hey ${toUser}\n*${pickupline}*`);
		})
		.catch((error)=>
		{
			console.log(error);
			message.channel.send("Oops! An error occured X( Try again later");
		});
	}
}
