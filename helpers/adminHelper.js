require("dotenv").config();
var { connectToMongoDB } = require("../config/connection");
const collection = require("../config/collection");
const { ObjectId } = require("mongodb");
const { response } = require("../app");

module.exports = {
  getUsersData: () => {
    console.log("function called");

    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();
      let getdata = await db
        .collection(collection.USER_COLLECTION)
        .find({})
        .toArray();
      console.log("getdata", getdata);
      resolve(getdata);
    });
  },

  //---------------------------------------------------------------------------------------- 

  getcandidatedata : () =>{
    console.log("candidate result");

    return new Promise (async (resolve,reject) => {
      const db = await connectToMongoDB();
      let getcandidate = await db.collection(collection.CANDIDATE_COLLECTION).find({}).toArray();
      console.log("getcandidatedata",getcandidate);
      resolve(getcandidate);
    })
  },

  
  addCandidate: (datacandidate) => {
    return new Promise(async (resolve, reject) => {
      console.log("candidatedata", datacandidate);

      let formdata = {
        name: datacandidate.name,
        designation: datacandidate.designation,
        voteCount:0
      };

      console.log("candidatedata@#$%^&*%$##", formdata);

      const db = await connectToMongoDB();

      const result = await db
        .collection(collection.CANDIDATE_COLLECTION)
        .insertOne(formdata)
        .then((data) => {
          console.log(data);
          resolve(data.insertedId);
        });
    });
  },

//---------------------------------------------------------------------------------------- 


  blockUser: (userid) => {
    return new Promise(async (resolve, reject) => {
      console.log("qWWWEWFEW##@%#$%$@^", userid);
  let id =  userid
  console.log("@@@@@@@@@@",id);
      const db = await connectToMongoDB();
  
      await db
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: new ObjectId (userid) },
          {$set : {
            blocked:true
          }}
        )
        .then((result) => {
          // Check if the update was successful
          if (result.matchedCount > 0) {
            resolve();
          } else {
            reject(new Error("User not found or not updated"));
          }
        })
        .catch((error) => {
          reject(error);
        });
        }
    )
  },
  

  unblockUser: (userid) => {
    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();
  
      await db
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: new ObjectId (userid) },
          {
            $set: { blocked: false },
          }
        )
        .then((result) => {
          // Check if the update was successful
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
  
//---------------------------------------------------------------------------------------- 

  doAdminLogin :(admindata) => {

     let adminPassword = process.env.PASSWORD
     let adminEmail = process.env.EMAIL

     console.log("dkndkjnvkjwvn!!!!!",adminPassword);
     console.log("dkndkjnvkjwvn!!!!!",adminEmail);

    
    return new Promise((resolve, reject) => {
      console.log("!@##$$%^**",admindata);
       if(admindata.email == adminEmail  && admindata.password == adminPassword){
        console.log("@#$$$$$$$$444--------- login success");
        resolve()
       }
    })
  },

}



