var express = require('express');
var router = express.Router();
var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");

const{
  signupPage, signup
}=require('../controllers/userController')


//  router.get('/signup',signupPage)

//  router.post('/signup',signup)



/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('user/userLogin', { admin:false });
  // res.send('respond with a resource');
});

 router.get('/home',(req,res)=>{
  res.render('user/home')
 })

 router.get('/signup',(req,res)=>{
  res.render('user/signupPage')
 })

// ------------------------------------mongodb connection------------------------------------

router.post("/signup", async function (req, res) {
  
  try {
    const database = await connectToMongoDB();

    await database.collection(collection.USER_COLLECTION).insertOne(req.body);

    res.redirect("/");
  } catch (error) {
    console.error("Error during MongoDB operation:", error);
    res.status(500).send("Internal Server Error");
  }
});
 
module.exports = router;

