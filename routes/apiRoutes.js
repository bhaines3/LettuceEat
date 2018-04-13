const router = require("express").Router();
const usersController=require("../controller/usersController.js");
const donorController=require("../controller/donorController.js");
const nonProfitController=require("../controller/nonProfitController.js");
const foodPostController=require("../controller/foodPostController.js");
const db = require("../models");

module.exports = router;
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
.delete(foodPostController.deleteFoodPost)


//=========INTERESTS==============
router
.route("/interests/")
.post(nonProfitController.addInterest)

router
.route("/interests/remove")
.post(nonProfitController.removeInterest)

module.exports = router