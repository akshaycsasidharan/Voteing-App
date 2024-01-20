var express = require("express");
var router = express.Router();
var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
var userHelper = require("../helpers/userHelper");

// router.get('/',function(req,res,next) {
//   userHelper.getallUsers().then((product) =>{
//     res.render('user/candidate',{user:true,product})
//   });
// });

const {
  signupPage,
  signup,
  loginPage,
  login,
  candidatePage,
  homePage,
} = require("../controllers/userController");

router.get("/signup", signupPage);

router.post("/signup", signup);

// router.get('/',(req,res)=>{
//   res.render('user/userLogin')
// })

router.get("/", loginPage);

router.post("/login", login);

// router.post('/login',(req,res)=>{
//   userHelper.doLogin(req.body)
// })

router.get("/candidate", candidatePage);

router.get("/home", homePage);

module.exports = router;
