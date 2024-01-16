var express = require('express');
var router = express.Router();

var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");

router.get('/view-users', (req, res)=> {
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


router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/submit", async function (req, res) {
  console.log("req.body", req.body);
  console.log("**&&&&&&%%%%%$$$###");

  try {
    const database = await connectToMongoDB();

    await database.collection(collection.USER_COLLECTION).insertOne(req.body);

    res.send("got it");
  } catch (error) {
    console.error("Error during MongoDB operation:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
 