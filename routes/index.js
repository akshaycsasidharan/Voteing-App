var express = require('express');
var router = express.Router();


// router.get('/', function(req, res, next) {
//   res.send('repond with a resource');
// });

router.get('/',(req,res)=>{
  res.render("login")
})

router.get('/signup',(req,res)=>{
  res.render("signup")
})
