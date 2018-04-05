const router = require("express").Router();
const usersController=require("../controller/usersController.js");
const donorController=require("../controller/donorController.js");
const nonProfitController=require("../controller/nonProfitController.js");
const axios = require("axios");
const db = require("../models");


//=========USERS==============
router
.route("/users/")
.get(usersController.findAllUsers)
.post(usersController.createUser);
    //CHECK TO SEE IF USER ALREADY EXISTS
router
.route("/user/")
.get(usersController.findOneuser);

//=========DONORS==============
router
.route("/donors/")
.get(donorController.findAllDonors)

router
.route("/donor/:id")
.get(donorController.findDonor)

//=========NONPROFITS==============
router
.route("/nonprofits/")
.get(nonProfitController.findAllNonProfits)

router
.route("/nonprofit/:id")
.get(nonProfitController.findNonProfit)

module.exports = router