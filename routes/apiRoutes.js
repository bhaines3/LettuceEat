const router = require("express").Router();
const usersController=require("../controller/usersController.js");
const axios = require("axios");
const db = require("../models");

//router.route("/user/:email/").get(usersController.findUser);

router
.route("/users/")
.get(usersController.findAllusers)
.post(usersController.createUser);
    //CHECK TO SEE IF USER ALREADY EXISTS
router
.route("/user/")
.get(usersController.findOneuser);
module.exports = router;