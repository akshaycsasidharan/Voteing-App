// collection upayogichu queries ezhuthenda place

var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
const bcrypt = require("bcrypt");

module.exports = {
  
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      console.log(userData);

      if (userData.password === userData.confirmpassword) {
        console.log(" @##$@#$%&*^^%$##$%^^&&&%E#@successed");
        var encryptedpassword = await bcrypt.hash(userData.password, 10);
        console.log(encryptedpassword);
      } else {
        console.log("error");
        throw new Error("given passwords are not same");
      }

      let signupData = {
        name: userData.name,
        email: userData.email,
        password: encryptedpassword,
        image: userData.imageURL,
        blocked: false,
        vote: false,
      };

      console.log(signupData);

      const db = await connectToMongoDB();

      await db
        .collection(collection.USER_COLLECTION)
        .insertOne(signupData)
        .then((data) => {
          console.log(data);
          resolve(data.insertedId);
        });
    });
  },

// ------------------------------------------------------------------------------------

  doLogin: (loginData) => {
    return new Promise(async (resolve, reject) => {
      console.log("logindata", loginData);
      console.log("hekjcdnckjsdnj", loginData.password, loginData.email);
      let loginstatus = false;
      let response = {};
      const db = await connectToMongoDB();
      let user = await db
        .collection(collection.USER_COLLECTION)
        .findOne({ email: loginData.email });

      console.log("hello", user);
      if (user) {
        bcrypt.compare(loginData.password, user.password).then((status) => {
          console.log(status);
          if (status) {
            console.log("login success");
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            console.log("login failed");
            resolve({ status: false });
          }
        });
      } else {
        console.log("email does not exist");
        resolve({ status: false });
      }
    });
  },

// ------------------------------------------------------------------------------------------------------
  
  showcandidates : () => {
    console.log("candidate result");

    return new Promise (async (resolve,reject) => {
      const db = await connectToMongoDB();
      let showcand = await db.collection(collection.CANDIDATE_COLLECTION).find({}).toArray();
      console.log("getcandidatedata",showcand);
      resolve(showcand);
    })
  },


};
