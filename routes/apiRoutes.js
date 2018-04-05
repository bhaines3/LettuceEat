const router = require("express").Router();
const usersController=require("../controller/usersController.js");
const axios = require("axios");
const db = require("../models");

router.route("/users/")
.get(usersController.findAllUsers)
.post(usersController.createUser);
    //CHECK TO SEE IF USER ALREADY EXISTS
router
.route("/user/")
.get(usersController.findOneuser);

module.exports = router