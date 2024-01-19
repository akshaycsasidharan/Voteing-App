// userinte login pg, functionalities signup, 

const { CURSOR_FLAGS } = require("mongodb")
const { render } = require("../app")
const userHelper = require("../helpers/userHelper")

module.exports = {
    signupPage:(req,res,next) => {
        res.render('user/signupPage')
    },
    
    signup:(req,res,next)=>{
     console.log("function called");
     console.log(req.body);
        try {
            userHelper.doSignup(req.body).then((response)=>{
                console.log(response);
                res.redirect('/')
            })
        } catch (error) {
            console.log(error);
        }
    },
    
    // loginPage:(req,res,next)=>{
    //     res.render('user/userLogin')
    // },

    // try {
    //     userHelper.doLogin(req.body)

    // } catch (error) {
        
    // }


    //  login:(req,res)

    candidatePage:(req,res,next)=>{
        res.render('user/candidate')
    },

    homePage:(req,res,next)=>{
        res.render('user/home')
    }

}

