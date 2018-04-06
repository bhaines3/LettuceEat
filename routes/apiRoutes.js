const router = require("express").Router();
const usersController=require("../controller/usersController.js");
const donorController=require("../controller/donorController.js");
const nonProfitController=require("../controller/nonProfitController.js");
const foodPostController=require("../controller/foodPostController.js");
const axios = require("axios");
const db = require("../models");
//will be used for authentication
var passport = require('passport');
require('../passport/config/passport')(passport);

//=========USERS==============
router
.route("/users/")
.get(usersController.findAllUsers)
//with auth:
// .route("/users/")
// .get(passport.authenticate('jwt', { session: false}),usersController.findAllUsers)
// .post(usersController.createUser);
//     //CHECK TO SEE IF USER ALREADY EXISTS
// router
// .route("/user/")
// .get(usersController.findOneuser);

//=========DONORS==============
router
.route("/donors/")
.get(donorController.findAllDonors)

router
.route("/donor/:id")
.get(donorController.findDonor)

router
.route("/donor/foodpost/:id")
.get(donorController.findDonorByFoodPostId)

//=========NONPROFITS==============
router
.route("/nonprofits/")
.get(nonProfitController.findAllNonProfits)

router
.route("/nonprofit/:id")
.get(nonProfitController.findNonProfit)

//=========FOODPOSTS==============
router
.route("/foodposts/")
.get(foodPostController.findAllPosts)
.post(foodPostController.createFoodPost)

router
.route("/foodposts/donor/:id")
.get(foodPostController.filterFoodPostsByDonor)

router
.route("/foodpost/:id")
.get(foodPostController.findOneFoodPost)

module.exports = router