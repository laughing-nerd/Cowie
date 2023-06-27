require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const mongoclient = new MongoClient(process.env.DBURI, {
	serverApi: {
		version: ServerApiVersion.v1,
    	strict: true,
    	deprecationErrors: true,
	}
});

const connect_to_db = async()=>{
	await mongoclient.connect();
}

connect_to_db();

module.exports = mongoclient;
