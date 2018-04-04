const router = require("express").Router();
const usersController=require("../controller/usersController.js");

const axios = require("axios");
const db = require("../models");

//router.route("/user/:email/").get(usersController.findUser);

module.exports=(router)=>{
    router.route("/api/users/").get(usersController.findAllusers).post(usersController.createUser);
    router.route("/api/user/:newUseremail").get(usersController.findOneuser)
}
