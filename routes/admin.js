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
  block,
   loginpage,
   adminlogin,
   unblock

} = require("../controllers/adminController");


router.get("/viewUser", viewUserspage);

router.get('/',loginpage);

router.post("/login",adminlogin);

  router.post("/block/:id",block);

 router.post("/unblock/:id",unblock);

router.get("/addCandidates", addcandidatePage);

router.post("/candidateadd",Candidatesadd);

router.get("/result", resultPage);
 

module.exports = router;
