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


  loginpage: (req,res,next) => {
    res.render("admin/adminLogin");
  },

  adminlogin: (req,res,next) => {
    console.log("function called");
    console.log(req.body);
    try {
      
      adminHelper.doAdminLogin(req.body).then(() => {
        res.redirect("/admin/viewUser")

      })

    } catch (error) {
      console.log(error);
    }
    
  },
  

// ---------------------------------------------------------------------------------------------

  resultPage: (req, res) => {
    res.render("admin/result");
  },

  resultPage: (req, res, next) => {
    adminHelper.getcandidatedata().then(async (canddata) => {
      console.log("!!!!!@@#$%%%%%^^&&***((()))))(((^&^", canddata);
      res.render("admin/result", {
        canddata,
      });
    });
  },

// ----------------------------------------------------------------------------------------------

block: (req, res, next) => {
  console.log("req.body",req.body);
  console.log("req.param",req.params.id);
  let id = req.params.id;
  console.log(id);
  adminHelper.blockUser(id,req.body).then((result) => {
    res.redirect("/admin/viewUser");
  });
},

unblock: (req, res) => {
  let id = req.params.id;
  console.log(id);
  adminHelper.unblockUser(id,req.body).then((result) => {
    res.redirect("/admin/viewUser");
  });
},

  // -------------------------------------------------------------------------------------------

  addcandidatePage: (req, res, next) => {
    res.render("admin/addCandidates");
  },

  Candidatesadd: (req, res) => {
    console.log(",2#R#$%");
    console.log(req.body);
    try {
      adminHelper.addCandidate(req.body).then((response) => {
        console.log(response);
        res.redirect("/admin/result");
      });
    } catch (error) {
      console.log(error);
    }
  },
};
