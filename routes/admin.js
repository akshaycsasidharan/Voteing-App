var express = require("express");
var router = express.Router();
var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");

const {
  adminHomepage,
  candidatePage,
  viewsUserspage,
  verifiedUserspage,
  resultPage,
} = require("../controllers/adminController");


router.get("/homes", adminHomepage);

router.get("/candidates", candidatePage);

router.get("/viewUsers", viewsUserspage);

router.get("/verifiedUsers", verifiedUserspage);

router.get("/result", resultPage);

module.exports = router;
