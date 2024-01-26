var express = require("express");
var router = express.Router();
var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
var adminHelper = require("../helpers/adminHelper");

// router.get('/verifiedUsers',function(req,res){
//   res.render('admin/verifiedUsers')
// });

// router.post('/verifiedUsers',(req,res) => {
//   adminHelper.addUsers(req.body).then(() => {
//     console.log(req.body);
//     res.render('admin/viewUsers')
//   });
// });

const {
  adminLoginpage,
  resultPage,
  viewUserspage,
  addcandidatePage,
} = require("../controllers/adminController");

router.get("/", adminLoginpage);

router.get("/viewUser", viewUserspage);

router.get("/addCandidates", addcandidatePage);

router.get("/result", resultPage);

module.exports = router;
