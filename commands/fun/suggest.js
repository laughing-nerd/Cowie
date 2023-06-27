const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "suggest",
    description: "Suggests a random anime",
    run: async(client, message)=>{
        let url="https://api.jikan.moe/v4/random/anime";
        fetch(url)
				.then(response=>response.json())
        .then(result=>{
						let title = result.data.title || result.data.title_english;
						let score = result.data.score || "";
						if(score.length!=0)
							score=" ["+score+"/10]";

						//Processing genres
						let genres_array = result.data.genres;
						let genres="";
						genres_array.forEach(element => {
								genres=genres+element.name+" | ";
						});
						genres=genres.substring(0,genres.length-3)

						let randomColor="";
						try{
							randomColor = Math.floor(Math.random() * 16777215).toString(16);
						}
						catch(error){
							randomColor = "ff0000";
						}
						const embed = new EmbedBuilder()
						.setColor(randomColor)
						.setTitle(title+score+"\n"+result.data.title_japanese||"")
						.setDescription(result.data.synopsis||"No Description available @_@")
						.setImage(result.data.images.jpg.large_image_url)
						.setFooter({ text: genres||"GENRES NOT FOUND" })
						.addFields(
							{name: "Type", value: result.data.type||"N/A", inline: true},
							{name: "Status", value: result.data.status||"N/A", inline: true},
							{name: "Rating", value: result.data.rating||"N/A", inline: true},
							{name: "Duration per episode", value: result.data.duration||"N/A", inline: true},
							{name: "Episodes", value: result.data.episodes.toString()||"N/A", inline: true},
						)


						message.channel.send({ embeds: [embed] });
					
        })
        .catch(err=>{
            message.channel.send("Something went wrong! Try again later");
        })
    }
}
