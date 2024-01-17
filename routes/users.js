var express = require('express');
var router = express.Router();
var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { admin:false });
});

// router.post('/submit',(req,res)=>{
//   console.log(req.body);

//   // res.send('got it')
// })

// ------------------------------------mongodb connection------------------------------------

router.post("/submit", async function (req, res) {
  
  try {
    const database = await connectToMongoDB();

    await database.collection(collection.USER_COLLECTION).insertOne(req.body);

    res.send("mongodb connected");
  } catch (error) {
    console.error("Error during MongoDB operation:", error);
    res.status(500).send("Internal Server Error");
  }
});
 
module.exports = router;

