var express = require("express");
var router = express.Router();
var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
var userHelper = require("../helpers/userHelper");

// router.get('/',function(req,res,next) {
//     res.render('index')
//   });

router.get("/candidate", function (req, res, next) {
  let user = req.session.user;

  res.render("user/candidate");
});

const {
  signupPage,
  signup,
  loginPage,
  login,
   candidatePage
} = require("../controllers/userController");

router.get("/signup", signupPage);

router.post("/signup", signup);

router.get("/", loginPage);

router.post("/login", login);

router.get("/candidate", candidatePage);

// router.get('/logout',(req,res)=>{
//   req.session.destroy()
//   res.redirect('/')
// })

module.exports = router;
