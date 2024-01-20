// collection upayogichu queries ezhuthenda place

var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
const bcrypt=require('bcrypt')

module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      console.log(userData);
      
      let signupData = {
        firstName:userData.first_name,
        lastName:userData.last_name,
        email:userData.email,
        password:userData.pw,
        userType:userData.userType,
        verified:false,
        vote:false,
        voteCount:0
      }

      const db = await connectToMongoDB();


      await db
        .collection(collection.USER_COLLECTION)
        .insertOne(signupData)
        .then((data) => {
            console.log(data);
            resolve(data.insertedId)
        });
    });
  },


  doLogin:(loginData) => {
    return new Promise(async(resolve, reject) => {
      console.log(loginData);
      let loginstatus=false
      let response={}
        const database = await connectToMongoDB();
        let user = await database.collection(collection.USER_COLLECTION).findOne({password:loginData.password})
        if(user){
            bcrypt.compare(loginData.password,user.password).then((status) =>{
              if(status){
                console.log("login successed");
                response.user=user
                response.status=true
                resolve(response)
              }else{
                console.log("login failed");
                resolve({status:false})
              }
            })
        }else{
          console.log('login fake');
          resolve({status:false})
        }
    })
  }
}

