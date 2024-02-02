
const { CURSOR_FLAGS } = require("mongodb");
const { render, response } = require("../app");
const adminHelper = require("../helpers/adminHelper");

module.exports = {
  
  viewUserspage: (req, res, next) => {
    adminHelper.getUsersData().then(async (usersdata) => {
      
      res.render("admin/viewUser", {
        usersdata,
      });
    });
  },

// -----------------------------------------------------------------------------

  loginpage: (req,res,next) => {
    res.render("admin/adminLogin");
  },

  adminlogin: (req,res,next) => {
    
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
      res.render("admin/result", {
        canddata,
      });
    });
  },

// ----------------------------------------------------------------------------------------------

block: (req, res, next) => {
  
  let id = req.params.id;

  adminHelper.blockUser(id,req.body).then((result) => {
    res.redirect("/admin/viewUser");
  });
},

unblock: (req, res) => {

  let id = req.params.id;

  adminHelper.unblockUser(id,req.body).then((result) => {
    res.redirect("/admin/viewUser");
  });
},

// -------------------------------------------------------------------------------------------

  addcandidatePage: (req, res, next) => {
    res.render("admin/addCandidates");
  },

  Candidatesadd: (req, res) => {
    console.log("req.file",req.file);
    
    try {
      adminHelper.addCandidate(req.body,req.file).then((response) => {
        res.redirect("/admin/result");
      });
    } catch (error) {
      console.log(error);
    }
  },


  adminsignout : (req,res) => {

    try {
      
      adminHelper.adminsignout()

    } catch (error) {

      console.log(error);

    }
  }

};
