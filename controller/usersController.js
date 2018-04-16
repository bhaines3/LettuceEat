const db = require("../models");
const nonProfitController = require("../controller/nonProfitController.js");
const donorController = require("../controller/donorController.js");
var jwt = require('jsonwebtoken');

module.exports = {
  //displaying all users in api/users
  findAllUsers: (req, res) => {
    db.User.findAll({
      include: [db.Donor, db.NonProfit]
    }).then((dbUser) => {
      res.json(dbUser);
    }).catch((err) => {
      console.log("Error from findAllUsers: " + err);
    })
  },
  createNewUser: (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, msg: 'Please pass email and password.' });
    }
    else {
      const newUserInfo = {
        email: req.body.email,
        name: req.body.name,
        location: req.body.location,
        // lat:req.body.lat,
        // lng:req.body.lng,
        isDonor: req.body.isDonor,
        phonenumber: req.body.phonenumber,
        password: req.body.password
      }
      //find user if already exists  in order to be able to create new account   
      db.User.findOne({
        where: {
          email: newUserInfo.email
        },
        include: [db.Donor, db.NonProfit]
      }).then((dbUserexists) => {
        //check to see if user exists already
        if (!dbUserexists) {
          console.log("User has been created.");
          db.User.create(newUserInfo)
            .then((dbUser) => {

              const returnUser = () =>
                res.json({ success: true, msg: 'Successful created new user.' });

              if (newUserInfo.isDonor != "true") {
                console.log("im a nonprofit");
                console.log(newUserInfo.isDonor);
                var nonProfitInfo = {
                  UserId: dbUser.id,
                  email: newUserInfo.email,
                  location: newUserInfo.location,
                  name: newUserInfo.name,
                  phonenumber: newUserInfo.phonenumber,
                }
                nonProfitController.createNonProfit(nonProfitInfo).then(returnUser);
              }
              else if (newUserInfo.isDonor) {
                console.log("im a donor");
                console.log(newUserInfo.isDonor)
                var donorInfo = {
                  UserId: dbUser.id,
                  email: newUserInfo.email,
                  location: newUserInfo.location,
                  // lat:req.body.lat,
                  // lng:req.body.lng,
                  name: newUserInfo.name,
                  phonenumber: newUserInfo.phonenumber,
                }
                donorController.createDonor(donorInfo).then(returnUser);
              }
            }).catch(function (err) {
              console.log("Error from createUser: " + err);
            });
        }
        else {
          res.json({ success: false, msg: "An account for this email account already exists." });
        }
      }).catch(function (err) {
        console.log("Error from findOne: " + err);
      });
    }
  }
}