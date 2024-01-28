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
   unblocked,
   loginpage

} = require("../controllers/adminController");


router.get("/viewUser", viewUserspage);

router.get('/',loginpage)

 router.post("/unblocked",unblocked)

router.get("/addCandidates", addcandidatePage);

router.get("/unblockuser",unblocked)

router.post("/candidateadd",Candidatesadd);

router.get("/result", resultPage);

module.exports = router;
