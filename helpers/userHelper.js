// collection upayogichu queries ezhuthenda place

var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");


module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            const database = await connectToMongoDB();

            await database.collection(collection.USER_COLLECTION).insertOne(req.body);
        })
    }
}