const fetch = require("node-fetch");

module.exports = {
    name: "suggest",
    description: "Suggests a random anime with anime description",
    run: async(client, message)=>{
        message.channel.send("Anime suggestion!");
    }
}