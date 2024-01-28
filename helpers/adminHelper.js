var { connectToMongoDB } = require("../config/connection");
const collection = require("../config/collection");

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

  dounblock: (userId) => {
    console.log("id called");

    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();
      let getid = await db
        .collection(collection.USER_COLLECTION)
        .find(userId)
        .then((response) => {
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!", response);

          if (blocked == true) {
            res.redirect("/candidate");
          } else {
            res.redirect("/login");
          }
        });
    });
  },

};
