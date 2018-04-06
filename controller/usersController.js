const db = require("../models");
const nonProfitController=require("../controller/nonProfitController.js");
const donorController=require("../controller/donorController.js");
const bcrypt = require("bcrypt");

module.exports = {
    //displaying all users in api/users
    findAllUsers:(req,res)=>{
      db.User.findAll({
        include: [db.Donor, db.NonProfit]
      }).then((dbUser)=>{
        //console.log(dbUser)
        res.json(dbUser);
      }).catch((err)=>{
        console.log("Error from findAllUsers: "+err);
      })
    },
    findOneuser: (req, res) =>{
      //find user if already exists  in order to be able to create new account   
      const email=req.query.email
      db.User.findOne({
        where:{
            email:email
        },
        include: [db.Donor, db.NonProfit]
      }).then((dbUser)=>{
        res.json(dbUser);
      }).catch(function(err) {
        console.log("Error from findOne: "+err);
      });
    },
    createUser: (req, res)=> {
      const password=req.body.password;
      //encrypt password
      const salt= bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(password, salt);
      const newUserInfo={
          email:req.body.email,
          name:req.body.name,
          isDonor:req.body.isDonor,
          phonenumber:req.body.phonenumber,
          password:hashedPassword
      }
     //create new user with encrypted password
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
        res.json(dbUser);
      }).catch(function(err) {
        console.log("Error from createUser: "+err);
      });
    }
}
