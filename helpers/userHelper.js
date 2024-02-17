// collection upayogichu queries ezhuthenda place

var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      console.log(userData);

      if (userData.password === userData.confirmpassword) {
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
        usercount:0,
      };


      const db = await connectToMongoDB();

      await db
        .collection(collection.USER_COLLECTION)
        .insertOne(signupData)
        .then((data) => {
          resolve(data.insertedId);
        });
    });
  },

  // ------------------------------------------------------------------------------------

  doLogin: (loginData) => {
    return new Promise(async (resolve, reject) => {
      let loginstatus = false;
      let response = {};
      const db = await connectToMongoDB();
      let user = await db
        .collection(collection.USER_COLLECTION)
        .findOne({ email: loginData.email });

      if (user) {
        bcrypt.compare(loginData.password, user.password).then((status) => {
          if (status) {
            console.log("login success");
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            resolve({ status: false });
          }
        });
      } else {
        resolve({ status: false });
      }
    });
  },

  // ------------------------------------------------------------------------------------------------------

  showcandidates: () => {

    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();
      let showcand = await db
        .collection(collection.CANDIDATE_COLLECTION)
        .find({ deleted: false })
        .toArray();
      resolve(showcand);
    });
  },

  // ----------------------------------------------------------

  dovote: (canddataid, userid) => {
    return new Promise(async (resolve, reject) => {
      let id = canddataid;

      const db = await connectToMongoDB();

      await db
        .collection(collection.CANDIDATE_COLLECTION)
        .updateOne(
          { _id: new ObjectId(canddataid) },
          { $inc: { voteCount: 1 } }
        );

      await db
        .collection(collection.USER_COLLECTION)
        .updateOne({ _id: new ObjectId(userid) }, { $set: { vote: true } })

        .then((result) => {
          if (result.matchedCount > 0) {
            resolve();
          } else {
            reject(new Error("User not found or not updated"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  
};
