var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('admin/adminLogin', { admin:true });
 // res.send('respond with a resource');
});

router.get('/candidatesAdmin',(req,res)=>{
  res.render('admin/candidatesAdmin')
 })

router.get('/viewUsers', (req, res)=> {
  res.render('admin/viewUsers');
});

router.get('/verifiedUsers', (req, res)=> {
  res.render('admin/verifiedUsers');
});



router.get('/result', (req, res)=> {
  res.render('admin/result');
});


module.exports = router;


