require("dotenv").config();
var { connectToMongoDB } = require("../config/connection");
const collection = require("../config/collection");
const { ObjectId } = require("mongodb");
// const { response } = require("../app");

module.exports = {
  doAdminLogin: (admindata) => {
    let adminPassword = process.env.PASSWORD;
    let adminEmail = process.env.EMAIL;

    return new Promise((resolve, reject) => {
      if (
        admindata.email == adminEmail &&
        admindata.password == adminPassword
      ) {
        resolve();
      }
    });
  },

  // --------------------------------------------------------------------------------------

  getUsersData: () => {
    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();
      let getdata = await db
        .collection(collection.USER_COLLECTION)
        .find({})
        .toArray();
      resolve(getdata);
    });
  },

  //----------------------------------------------------------------------------------------

  blockUser: (userid) => {
    return new Promise(async (resolve, reject) => {
      let id = userid;

      const db = await connectToMongoDB();

      await db
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: new ObjectId(userid) },
          {
            $set: {
              blocked: true,
            },
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

  unblockUser: (userid) => {
    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();

      await db
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: new ObjectId(userid) },
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

  addCandidate: (datacandidate, file) => {
    return new Promise(async (resolve, reject) => {
      let formdata = {
        name: datacandidate.name,
        designation: datacandidate.designation,
        Image: file.filename,
        voteCount: 0,
        deleted: false,
      };

      const db = await connectToMongoDB();

      const result = await db
        .collection(collection.CANDIDATE_COLLECTION)
        .insertOne(formdata)
        .then((data) => {
          resolve(data.insertedId);
        });
    });
  },

  //----------------------------------------------------------------------------------------

  getcandidatedata: () => {
    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();
      let getcandidate = await db
        .collection(collection.CANDIDATE_COLLECTION)
        .find({})
        .sort({ voteCount: -1 })
        .toArray();
      resolve(getcandidate);
    });
  },

  //  -------------------------------------------------------------------------------------------

  dashboarddata: () => {
    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();

      const getCandidateResult = await db
        .collection(collection.CANDIDATE_COLLECTION)
        .aggregate([
          {
            $match: { deleted: false },
          },
          {
            $group: {
              _id: null,
              votedCount: { $sum: 1 },
            },
          },
        ])
        .toArray();

      const getUserVotedResult = await db
        .collection(collection.USER_COLLECTION)
        .aggregate([
          {
            $match: { vote: true },
          },
          {
            $group: {
              _id: null,
              votedUserCount: { $sum: 1 },
            },
          },
        ])
        .toArray();

      const getUserUnvotedResult = await db
        .collection(collection.USER_COLLECTION)
        .aggregate([
          {
            $match: { vote: false },
          },
          {
            $group: {
              _id: null,
              unvotedUserCount: { $sum: 1 },
            },
          },
        ])
        .toArray();

        const getTotalusers = await db
        .collection(collection.USER_COLLECTION)
        .aggregate([
          {
            $group: {
              _id: null,
              totalUsersCount: { $sum: 1 },
            },
          },
        ])
        .toArray();
      
      // Resolve with the count value
      resolve({
        totalCandidatesCount:
          getCandidateResult.length > 0 ? getCandidateResult[0].votedCount : 0,
        votedUsersCount:
          getUserVotedResult.length > 0 ? getUserVotedResult[0].votedUserCount : 0,
        unvotedUsersCount:
          getUserUnvotedResult.length > 0
            ? getUserUnvotedResult[0].unvotedUserCount
            : 0,
        totalUsersCount: getTotalusers.length > 0 ? getTotalusers[0].totalUsersCount : 0,
      });
      
    });
  },

  // ----------------------------------------------------------------------------------------------------------------------------

  viewcandidates: () => {
    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();
      let viewcandidates = await db
        .collection(collection.CANDIDATE_COLLECTION)
        .find({
          deleted: false,
        })
        .toArray();
      resolve(viewcandidates);
    });
  },

  deletecand: (deleteid) => {
    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();
      await db
        .collection(collection.CANDIDATE_COLLECTION)
        .updateOne({ _id: new ObjectId(deleteid) }, { $set: { deleted: true } })
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

  editcandidate: (editid) => {
    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();
      await db
        .collection(collection.CANDIDATE_COLLECTION)
        .findOne({ _id: new ObjectId(editid) })
        .then((result) => {
          // console.log("@@@@@@@@@@@@@@@@@", result);

          if (result) {
            resolve(result);
          } else {
            reject(new Error("Candidate not found"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  candupdate: (userid, updatedetails) => {
    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();
      await db
        .collection(collection.CANDIDATE_COLLECTION)
        .updateOne(
          { _id: new ObjectId(userid) },
          {
            $set: {
              name: updatedetails.name,
              designation: updatedetails.designation,
            },
          }
        )
        .then((response) => {
          console.log("@@@@@@@@@response########", response);
          resolve();
        });
    });
  },

  // ------------------------------------------------------------------------------------------------------
};
