const Canvas = require('canvas');
const { AttachmentBuilder } = require('discord.js');
const { welcome_variation } = require('../data.json');

module.exports = {
	run: async(client, member)=>{
		const guildId = member.guild.id;
		if(client.welcome.get(guildId))
		{
			const channel = member.guild.channels.cache.find(channel => channel.id == client.welcome.get(guildId));
			if(channel != undefined)
			{
				username = member.user.username;

				const canvas = new Canvas.createCanvas(700, 250);
				const ctx = canvas.getContext('2d');

				//Setting the background image
				const bg = "https://c4.wallpaperflare.com/wallpaper/668/701/217/anime-original-dark-red-wallpaper-preview.jpg";
				const bgImg = await Canvas.loadImage(bg)
				ctx.drawImage(bgImg, 0, 0);

				//Setting the display displayAvatar
				const dp = await Canvas.loadImage("https://cdn.discordapp.com/avatars/"+member.user.id+"/"+member.user.avatar+".jpeg");
				const avatar_x = canvas.width/2 - dp.width/2;
				const avatar_y = 25;
				const clip_x = canvas.width/2;
				const clip_y = avatar_y + (dp.height)/2;
				ctx.save()
				ctx.beginPath()
				ctx.arc(clip_x, clip_y, dp.height/2, 0, Math.PI * 2, false)
				ctx.strokeStyle = '#ffffff'
				ctx.lineWidth=12;
				ctx.stroke()
				ctx.clip()
				ctx.drawImage(dp, avatar_x, avatar_y)
				ctx.restore()


				//Setting the welcome message
				const randomIndex = Math.floor(Math.random()*welcome_variation.length);
				const welcome_message = `${member.user.tag} `+welcome_variation[randomIndex];
				ctx.fillStyle = "#ffffff"
				ctx.font = "bold 25px Arial";
				ctx.textAlign = "center";
				ctx.fillText(welcome_message, canvas.width/2, 200);

				let welcome_text = "Welcome <user> to this server";
				welcome_text = welcome_text.replace("<user>", `<@${member.user.id}>`);
				const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome.png' })
				channel.send({ content:`@everyone ${welcome_text}> :grin:`, files:[attachment] });
			} 
		}
	}
}
