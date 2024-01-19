// adminte functionalities ezhuthaan login pg , login functions

// userinte login pg, functionalities signup,

const { CURSOR_FLAGS } = require("mongodb")
const { render } = require("../app")
const adminHelper = require("../helpers/adminHelper")

module.exports = {


    adminHomepage:(req,res,next)=>{
        res.render('admin/adminHome')
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

