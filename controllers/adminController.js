// adminte functionalities ezhuthaan login pg , login functions

// userinte login pg, functionalities signup,

const { CURSOR_FLAGS } = require("mongodb")
const { render } = require("../app")
const adminHelper = require("../helpers/adminHelper")

module.exports = {

    adminLoginpage:(req,res,next)=>{
        res.render('admin/adminLogin')
    },

    login:(req,res)=>{
        console.log("function called");
        console.log(req.body);
           try {
               adminHelper.logindo(req.body).then((response)=>{
                   console.log(response);
                    res.redirect('/candidates')
               })
           } catch (error) {
               console.log(error);
           }
       },
       









    candidatePage:((req,res,next)=>{
        res.render('admin/candidatesAdmin')
    }),
    
    viewsUserspage:(req,res,next)=>{
        res.render('admin/viewUsers')
    },

    verifiedUserspage:(req,res,next)=>{
        res.render('admin/verifiedUsers')
    },

    resultPage:(req,res)=>{
        res.render('admin/result')
    }

}

