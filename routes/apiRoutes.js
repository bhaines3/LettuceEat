const router = require("express").Router();
const usersController=require("../controller/usersController.js");
const bcrypt = require("bcrypt");
const axios = require("axios");
const db = require("../models");

//router.route("/user/:email/").get(usersController.findUser);

module.exports=(router)=>{
    router
    .route("/api/users/")
    .get(usersController.findAllUsers)
    .post(usersController.createUser);
}
