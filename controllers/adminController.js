// adminte functionalities ezhuthaan login pg , login functions
// userinte login pg, functionalities signup,

const { CURSOR_FLAGS } = require("mongodb");
const { render, response } = require("../app");
const adminHelper = require("../helpers/adminHelper");

module.exports = {
  viewUserspage: (req, res, next) => {
    adminHelper.getUsersData().then(async (usersdata) => {
      console.log(
        "usersdatacdfefnekjln##@@@$$%%&&*%%$#@@!!@@@##$$$%",
        usersdata
      );
      res.render("admin/viewUser", {
        usersdata,
      });
    });
  },




  unblocked:(req,res,next) =>{
    console.log(req.body);

    try {
      
       adminHelper.dounblock(req.body.userId)
      
    } 
    catch (error) {
      
      console.log(error);

    }

  },

  // -------------------------------------------------------------------------------------

  addcandidatePage: (req, res, next) => {
    res.render("admin/addCandidates");
  },

  Candidatesadd: (req, res) => {
    console.log(",2#R#$%");
    console.log(req.body);
    try {
      adminHelper.doCandidate(req.body).then((response) => {
        console.log(response);
        res.redirect("/result");
      });
    } catch (error) {
      console.log(error);
    }
  },

  resultPage: (req, res) => {
    res.render("admin/result");
  },
};
