const router = require("express").Router();
const usersController=require("../controller/usersController.js");
const donorController=require("../controller/donorController.js");
const nonProfitController=require("../controller/nonProfitController.js");
const foodPostController=require("../controller/foodPostController.js");
const db = require("../models");
var jwt = require('jsonwebtoken');
var passport = require("../config/passport");
var settings = require('../routes/authRoutes/config/settings');


router
.route("/login/")
.post((req, res) => {
    passport.authenticate('local')(req, res, function () {
        var token = jwt.sign(req.user.toJSON(), settings.secret);
        res.json({success: true, token: 'JWT ' + token});
    });
})
router
.route("/signup/")
.post(usersController.createNewUser)

router
.route("/logout/")
.get((req, res) => {
    req.logout();
})
//=========USERS==============
router
.route("/users/")
.get(usersController.findAllUsers);
//=========DONORS==============
router
.route("/donors/")
.get(donorController.findAllDonors)

router
.route("/donor/:id")
.get(donorController.findDonor)
.put(donorController.updateDonor)

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
.put(nonProfitController.updateNonProfit)

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
.put(foodPostController.updateFoodPost)

router
.route("/foodpost/:id/:donorId")
.delete(foodPostController.deleteFoodPost)


//=========INTERESTS==============
router
.route("/interests/")
.post(nonProfitController.addInterest)

router
.route("/interests/remove")
.post(nonProfitController.removeInterest)

module.exports = router