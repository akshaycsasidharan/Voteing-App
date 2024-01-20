var express = require("express");
var router = express.Router();
var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
var adminHelper = require('../helpers/adminHelper');


router.get('/',function(req,res,next) {
  adminHelper.getallUsers().then((product) =>{
    res.render('admin/viewUsers',{admin:true,product})
  });
});

router.get('/verifiedUsers',function(req,res){
  res.render('admin/verifiedUsers')
});

router.post('/verifiedUsers',(req,res) => {
  adminHelper.addUsers(req.body).then(() => {
    console.log(req.body);
    res.render('admin/viewUsers')
  });
});


module.exports = router;







// const {
//   adminHomepage,
//   candidatePage,
//   viewsUserspage,
//   verifiedUserspage,
//   resultPage,
// } = require("../controllers/adminController");


// router.get("/homes", adminHomepage);

// router.get("/candidates", candidatePage);

// router.get("/viewUsers", viewsUserspage);

// router.get("/verifiedUsers", verifiedUserspage);

// router.get("/result", resultPage);


