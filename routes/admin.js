var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { admin:true });
 // res.send('respond with a resource');
});


router.get('/admin', (req, res)=> {
  res.render('admin/view-users');
});

router.get('/verified-users', (req, res)=> {
  res.render('admin/verified-users');
});

router.get('/candidatesadmin', (req, res)=> {
  res.render('admin/candidatesadmin');
});

router.get('/result', (req, res)=> {
  res.render('admin/result');
});


module.exports = router;


