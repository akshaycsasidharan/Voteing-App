// userinte login pg, functionalities signup,

const { CURSOR_FLAGS } = require("mongodb");
const { render } = require("../app");
const userHelper = require("../helpers/userHelper");

module.exports = {
  signupPage: (req, res, next) => {
    res.render("user/signupPage");
  },

  signup: (req, res) => {
    try {
      userHelper.doSignup(req.body).then((response) => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  },
  //----------------------------------------------------------------------------------------------------------------------

  loginPage: (req, res, next) => {
    
    res.render("user/userLogin");
  },

  login: (req, res, next) => {
    try {
      userHelper.doLogin(req.body).then((response) => {
        if (response.status) {
          req.session.loggedIn = true;
          req.session.user = response.user;
          console.log("##########",req.session.loggedIn);
          //       if(req.session.loggedIn){
          //   res.redirect("/candidate");
          // }else{
          //   res.render("/");
          // }

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

  candidatepage: (req, res) => {

    console.log("$$$$$$$$$$$candidatepage");
    let user = req.session.user;
    console.log("loggedin################$$$$$",req.session.loggedIn);
    if(req.session.loggedIn){
      userHelper.showcandidates().then( (showcand) => {
        console.log("###########",req.session);
        res.render("user/candidate", {
          showcand,
          user,
        });
      });
    }else{
      res.redirect("/")
    }
    
  },

  // -------------------------------------------------------------------------------------------------------------

  vote: (req, res, next) => {
    
    let userId = req.session.user._id;

    let id = req.params.id;

    userHelper.dovote(id, userId).then((result) => {
      res.redirect("/candidate");
    });
  },


};
