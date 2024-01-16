var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { admin:false });
});

router.get('/candidate', (req, res)=> {
  res.render('user/candidate');
});



module.exports = router;
