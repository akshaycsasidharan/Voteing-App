var express = require("express");
var router = express.Router();
var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");

const {
  signupPage,
  signup,
  
  candidatePage,
  homePage,
} = require("../controllers/userController");



router.get("/signup", signupPage);

router.post("/signup", signup);

// router.get("/", loginPage);

router.get("/candidate", candidatePage);

router.get("/home", homePage);

module.exports = router;
