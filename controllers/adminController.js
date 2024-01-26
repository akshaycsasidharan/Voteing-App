// adminte functionalities ezhuthaan login pg , login functions
// userinte login pg, functionalities signup,

const { CURSOR_FLAGS } = require("mongodb");
const { render } = require("../app");
const adminHelper = require("../helpers/adminHelper");

module.exports = {
  adminLoginpage: (req, res, next) => {
    res.render("admin/adminLogin");
  },

  // login: (req, res) => {
  //   console.log("function called");
  //   console.log(req.body);
  //   try {
  //     adminHelper.logindo(req.body).then((response) => {
  //       console.log(response);
  //       res.redirect("/viewUser");
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  viewUserspage: (req, res, next) => {
    res.render("admin/viewUser");
  },

  addcandidatePage: (req, res, next) => {
    res.render("admin/addCandidates");
  },

  resultPage: (req, res) => {
    res.render("admin/result");
  },
};
