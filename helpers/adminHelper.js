var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");

module.exports = {

  logindo: (userData) => {
    return new Promise(async (resolve, reject) => {
      console.log(userData);
     
      // if(userData.password === userData.confirmpassword){

      //   console.log(" @##$@#$%&*^^%$##$%^^&&&%E#@successed");
      //     var encryptedpassword = await bcrypt.hash(userData.password,10)
      //    console.log(encryptedpassword);
      // }else{
      //   console.log("error");
      //   throw new Error("given passwords are not same")
      // }

      let signupData = {
        email:userData.email,
        password:userData.password,
      }

      console.log(signupData);

      const db = await connectToMongoDB();

      await db
        .collection(collection.ADMIN_COLLECTION)
        .insertOne(signupData)
        .then((data) => {
            console.log(data);
            resolve(data.insertedId)
        });
    });
  }

}
    
