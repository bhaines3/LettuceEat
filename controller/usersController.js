const db = require("../models");
const nonProfitController=require("../controller/nonProfitController.js");
const donorController=require("../controller/donorController.js");
var jwt = require('jsonwebtoken');
var settings = require('../routes/authRoutes/config/settings');

module.exports = {
  //displaying all users in api/users
  findAllUsers:(req,res)=>{
    db.User.findAll({
      include: [db.Donor, db.NonProfit]
    }).then((dbUser)=>{
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
        location:req.body.location,
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
                location:newUserInfo.location,
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
                location: newUserInfo.location,
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
    db.User.findOne({
      where:{
          email:req.body.email
      },
      include: [db.Donor, db.NonProfit]
    }).then((dbUser)=>{
      if(!dbUser){
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      }
      else{
        // check if password matches
        const validpass=dbUser.validPassword(req.body.password);
        if (validpass) {
          var token = jwt.sign(dbUser.toJSON(), settings.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      }
    }).catch(function(err) {
      console.log("Error from findOne existing user: "+ err);
    });
  }
}