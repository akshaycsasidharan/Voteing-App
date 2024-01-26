// userinte login pg, functionalities signup,

const { CURSOR_FLAGS } = require("mongodb");
const { render } = require("../app");
const userHelper = require("../helpers/userHelper");

module.exports = {
  signupPage: (req, res, next) => {
    res.render("user/signupPage");
  },

  signup: (req, res) => {
    console.log("function called");
    console.log(req.body);
    try {
      userHelper.doSignup(req.body).then((response) => {
        console.log(response);
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  },
  //----------------------------------------------------------------------------------------------------------------------

  loginPage: (req, res, next) => {
    if (req.session.loggedIn) {
      res.redirect("/");
    } else res.render("user/userLogin");
  },

  login: (req, res, next) => {
    console.log("function called");
    console.log(req.body);
    try {
      userHelper.doLogin(req.body).then((response) => {
        console.log(response);
        if (response.status) {
          console.log(response.status);
          req.session.loggedIn = true;
          req.session.user = response.user;
          res.redirect("/candidate");
        } else {
          res.redirect("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  // -------------------------------------------------------------------------------------------------------------

  candidatePage: (req, res, next) => {
    res.render("user/candidate");
  },


};
