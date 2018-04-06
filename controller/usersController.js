const db = require("../models");
const nonProfitController=require("../controller/nonProfitController.js");
const donorController=require("../controller/donorController.js");
var jwt = require('jsonwebtoken');
var passport = require('passport');
var settings = require('../passport/config/settings');
require('../passport/config/passport')(passport);
//encrypted in when creating user
module.exports = {
    //displaying all users in api/users
    findAllUsers:(req,res)=>{
      // //with auth for testing
      //   const token=getToken(req.headers);
      //   if(token){
      //     db.User.findAll({
      //       include: [db.Donor, db.NonProfit]
      //     }).then((dbUser)=>{
      //       //console.log(dbUser)
      //       res.json(dbUser);
      //     }).catch((err)=>{
      //       console.log("Error from findAllUsers: "+err);
      //     })
      //   }
      //   else{
      //     return res.status(403).send({success: false, msg: 'Unauthorized.'});
      //   }
      // },
      //without auth for testing
      db.User.findAll({
        include: [db.Donor, db.NonProfit]
      }).then((dbUser)=>{
        //console.log(dbUser)
        res.json(dbUser);
      }).catch((err)=>{
        console.log("Error from findAllUsers: "+err);
      })
    },
    createNewuser: (req, res) =>{
      if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass email and password.'});
      } 
      else {
        const newUserInfo={
          email:req.body.email,
          name:req.body.name,
          isDonor:req.body.isDonor,
          phonenumber:req.body.phonenumber,
          password:req.body.password
        }  
        //find user if already exists  in order to be able to create new account   
        db.User.findOne({
          where:{
              email:newUserInfo.email
          },
          include: [db.Donor, db.NonProfit]
        }).then((dbUserexists)=>{
          //check to see if user exists already
          if(!dbUserexists){
            console.log("User has been created.");
            db.User.create(newUserInfo)
            .then((dbUser)=> {
              if (!newUserInfo.isDonor)
              {
                var nonProfitInfo = {
                  UserId: dbUser.id,
                  email: newUserInfo.email,
                  name: newUserInfo.name,
                  phonenumber: newUserInfo.phonenumber,
                }
                nonProfitController.createNonProfit(nonProfitInfo);
              }
              else if (newUserInfo.isDonor)
              {
                var donorInfo = {
                  UserId: dbUser.id,
                  email: newUserInfo.email,
                  name: newUserInfo.name,
                  phonenumber: newUserInfo.phonenumber,
                }
                donorController.createDonor(donorInfo);
              }
              res.json({success: true, msg: 'Successful created new user.'});
            }).catch(function(err) {
              console.log("Error from createUser: "+err);
            });
          }
          else{
            res.json({success: false, msg: "An account for this email account already exists."});
          }
        }).catch(function(err) {
            console.log("Error from findOne: "+err);
        });
      }
    },
    findOneuser: (req, res) =>{
      //find user if already exists  in order to be able to login
      console.log("on my way to find one user in controller");
      console.log("pass= "+req.body.password);
      console.log("email= "+ req.body.email);
    
      db.User.findOne({
        where:{
            email:req.body.email
        },
        include: [db.Donor, db.NonProfit]
      }).then((dbUser)=>{
        console.log("what is dbUser "+ dbUser)
        if(!dbUser){
          console.log("I did not find one user");//*last msg it prints
          res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        }
        else{
          console.log("I found one user, now check password");
          // check if password matches
          const validpass=dbUser.validPassword(req.body.password);
          console.log(validpass);
          if (validpass) {
            console.log("passwords matched and there was no error");
            console.log("now i get jwt token");
            // if user is found and password is right create a token
            var token = jwt.sign(dbUser.toJSON(), settings.secret);
            console.log("whats my token token= "+token)
          
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            console.log("no match and there is error")
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        }
      }).catch(function(err) {
        console.log("Error from findOne existing user: "+ err);
      });
    }
}