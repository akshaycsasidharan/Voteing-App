const { CURSOR_FLAGS } = require("mongodb");
const { render, response } = require("../app");
const adminHelper = require("../helpers/adminHelper");

module.exports = {


  loginpage: (req, res, next) => {
    res.render("admin/adminLogin");
  },

  adminlogin: (req, res, next) => {
    try {
      adminHelper.doAdminLogin(req.body).then(() => {
        res.redirect("/admin/viewUser");
      });
    } catch (error) {
      console.log(error);
    }
  },

  // ---------------------------------------------------------------------------------------------
  
  viewUserspage: (req, res, next) => {
    adminHelper.getUsersData().then(async (usersdata) => {
      res.render("admin/viewUser", {
        usersdata,
      });
    });
  },

  // ---------------------------------------------------------------------------------------------

  block: (req, res, next) => {
    let id = req.params.id;

    adminHelper.blockUser(id).then((result) => {
      res.redirect("/admin/viewUser");
    });
  },

  unblock: (req, res) => {
    let id = req.params.id;

    adminHelper.unblockUser(id).then((result) => {
      res.redirect("/admin/viewUser");
    });
  },

  // -------------------------------------------------------------------------------------------

  addcandidatePage: (req, res, next) => {

    res.render("admin/addCandidates");

  },

  Candidatesadd: (req, res) => {
    // console.log("req.file",req.file);

    try {
      adminHelper.addCandidate(req.body, req.file).then((response) => {
        res.redirect("/admin/viewcandidate");
      });
    } catch (error) {
      console.log(error);
    }
  },

  //----------------------------------------------------------------------------------------------

  viewcandidate: (req, res) => {
    adminHelper.viewcandidates().then(async (viewdata) => {
      res.render("admin/viewcandidate", {
        viewdata,
      });
    });
  },


  deletecandidate: (req, res) => {
    let id = req.params.id;
    adminHelper.deletecand(id).then(() => {
      res.redirect("/admin/viewcandidate"); // Corrected redirect path
    });
  },


  editcandidate: (req, res) => {

     let id = req.params.id;

    adminHelper.editcandidate(id).then((result) => {


     res.render("admin/editCandidate",{result})

    });

  },


  updatecandidate : (req,res) => {

      console.log("req.body@@@@@@",req.body);

     let id = req.params.id;

    console.log("***********",id);
    console.log("req,#########",req.body);

    adminHelper.candupdate(id,req.body).then(() => {
      
      res.redirect("/admin/viewcandidate")
    })
  
  },

// ----------------------------------------------------------------------------------------------

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

// ------------------------------------------------------------------------------------

};
