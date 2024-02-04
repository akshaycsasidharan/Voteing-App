var express = require("express");
var router = express.Router();
var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
var adminHelper = require("../helpers/adminHelper");

const {

  upload

} = require ("../public/javascripts/multer");


const {

  resultPage,
  viewUserspage,
  addcandidatePage,
  Candidatesadd,
  block,
   loginpage,
   adminlogin,
   unblock,
   viewcandidate,
   deletecandidate,
   editcandidate,
   updatecandidate

} = require("../controllers/adminController");


router.get("/viewUser", viewUserspage);

router.get('/',loginpage);

router.post("/login",adminlogin);

  router.post("/block/:id",block);

 router.post("/unblock/:id",unblock);

router.get("/addCandidates",  addcandidatePage);

router.post("/candidateadd",upload.single('image'),Candidatesadd);

router.get("/result", resultPage);

router.get("/viewcandidate",viewcandidate);

router.post("/delete/:id", deletecandidate);

router.post("/edit/:id",editcandidate);

router.post("/editCandidate/:id",updatecandidate)
 

module.exports = router;
