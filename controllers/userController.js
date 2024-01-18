// userinte login pg, functionalities signup, 

const userHelper = require("../helpers/userHelper")

module.exports = {
    signupPage:(req,res,next)=>{
        res.render('user/signupPage')
    },
    
    signup:(req,res,next)=>{
        try {
            userHelper.doSignup(req.body).then((response)=>{
                console.log(response);
                res.redirect('/')
            })
        } catch (error) {
            console.log(error);
        }
    }
}

