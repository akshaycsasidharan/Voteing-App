var express = require("express");
var router = express.Router();
var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
var userHelper = require("../helpers/userHelper");



const {
  signupPage,
  signup,
  loginPage,
  login,
  candidatepage,
  vote
} = require("../controllers/userController");

router.get("/signup", signupPage);

router.post("/signup", signup);

router.get("/", loginPage);

router.post("/login", login);

router.get("/candidate",candidatepage);

router.post("/vote/:id",vote);

router.get('/signout',(req,res)=>{
  res.session.destroy()
  res.redirect("user/userLogin")
})

module.exports = router;
