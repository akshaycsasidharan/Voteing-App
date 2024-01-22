var express = require("express");
var router = express.Router();
var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
var adminHelper = require('../helpers/adminHelper');




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
  login,
  candidatePage,
  viewsUserspage,
  resultPage,
} = require("../controllers/adminController");

router.get("/adminlogin",adminLoginpage)

router.post('/adminlogin',login)


router.get("/candidates", candidatePage);

router.get("/viewUsers", viewsUserspage);


router.get("/result", resultPage);






module.exports = router;








