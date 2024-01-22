// collection upayogichu queries ezhuthenda place

var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
const bcrypt=require('bcrypt')

module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      console.log(userData);
     
      if(userData.password === userData.confirmpassword){

        console.log(" @##$@#$%&*^^%$##$%^^&&&%E#@successed");
          var encryptedpassword = await bcrypt.hash(userData.password,10)
         console.log(encryptedpassword);
      }else{
        console.log("error");
        throw new Error("given passwords are not same")
      }

      

      let signupData = {
        fullName:userData.fullname,
        email:userData.email,
        password:encryptedpassword,
        usertype:userData.usertype,
        image:userData.image,
        verified:false,
        vote:false,
        voteCount:0
      }

    // console.log("user type:",signupData.usertype);
    // console.log("image:",signupData.image);

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
        const db = await connectToMongoDB();
        let user = await db.collection(collection.USER_COLLECTION).findOne({email:loginData.email})
        if(user){
            bcrypt.compare(loginData.password,user.password).then((status) =>{
              if(status){
                console.log("login success");
                response.user=user
                response.status=true
                resolve(response)
              }else{
                console.log("login failed");
                 resolve({status:false})
              }
            });
        }else{
          console.log('email does not exist');
          resolve({status:false})
        }
    })
  }
};

