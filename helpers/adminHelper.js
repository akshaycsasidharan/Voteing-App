var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");

module.exports = {

    addUsers:(users)=>{
            return new Promise(async (resolve, reject) => {
              const database = await connectToMongoDB();
        
              await database
                .collection(collection.ADMIN_COLLECTION)
                .insertOne(users)
                .then((data) => {
                  resolve(data)
                });
            });
          },

          getallUsers:()=>{
            return new Promise(async(resolve,reject) => {
              const database = await connectToMongoDB();

              let product = await database.collection(collection.ADMIN_COLLECTION).find().toArray()
              resolve(product)
            })
          } 
    }
    
