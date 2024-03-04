const { CURSOR_FLAGS } = require("mongodb");
const { render, response } = require("../app");
const adminHelper = require("../helpers/adminHelper");

module.exports = {


  loginpage: (req, res, next) => {
    if (req.session.AdminloggedInErr) {
      res.render("admin/adminLogin", {
        AdminloggedInErr: req.session.AdminloggedInErr,
      });
      return (req.session.AdminloggedInErr = false);
    }
    res.render("admin/adminLogin");
  },


  adminlogin: (req, res, next) => {
    console.log("@@@@@@@222",req.body);

    
    if (
      req.body.email === "admin"
      &&
      req.body.password === 1234
    ) {
        console.log("$$$$$$$$$$$");
      console.log(req.session);
      req.session.Admin = req.body;
      req.session.Adminloggedin = true;
      // console.log(req.session);
      res.redirect("/admin");
    } else {
      console.log(req.body);
      req.session.AdminloggedInErr = "invalid user or password";
      res.redirect("/admin/dashboard");
    }
    // try {

      
    //   adminHelper.doAdminLogin(req.body).then(() => {
        
    //     if (response) {
    //       req.session.adminLoggedIn = true;
    //       req.session.admin = response.admin;
    //     }
    //     res.redirect("/admin/viewUser");
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  },

  // ---------------------------------------------------------------------------------------------
  
  viewUserspage: (req, res, next) => {
    let user = req.session.user
    // console.log("userrrrrrrrrrrrr",user);


    adminHelper.getUsersData().then(async (usersdata) => {
      res.render("admin/viewUser", {
        usersdata,user
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

      // console.log("req.body@@@@@@",req.body);

     let id = req.params.id;

    // console.log("***********",id);
    // console.log("req,#########",req.body);

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



  dashboardpage :(req,res,next) => {
    res.render("admin/dashBoard")
  },

  dashboardpage: (req, res, next) => {
    adminHelper.dashboarddata().then(async (dashdata) => {
      // console.log("@@@@@@@@@@@@@@@@@dscvdsfvd", dashdata);
      
      // Assuming dashdata is an object with properties like totalCandidatesCount, votedUsersCount, unvotedUsersCount
      res.render('admin/dashBoard', { dashdata: dashdata });
    }).catch((err) => {
      console.error("Error fetching dashboard data:", err);
      // Handle the error and send an appropriate response
      res.status(500).send("Error fetching dashboard data");
    });
  }
  

// ------------------------------------------------------------------------------------

};
