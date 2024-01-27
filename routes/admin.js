var express = require("express");
var router = express.Router();
var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
var adminHelper = require("../helpers/adminHelper");



const {

  resultPage,
  viewUserspage,
  addcandidatePage,
  Candidatesadd,
   unblocked

} = require("../controllers/adminController");


router.get("/viewUser", viewUserspage);

router.post("/unblocked",unblocked)

router.get("/addCandidates", addcandidatePage);


router.post("/candidateadd",Candidatesadd);

// router.post("/unblocked",unblocked)

router.get("/result", resultPage);

module.exports = router;
