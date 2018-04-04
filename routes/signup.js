const router = require("express").Router();
const signupController=require("./controller/signup.js");
const bcrypt = require("bcrypt");
const axios = require("axios");


router.get("/api/user/:email",(req,res)=>{
    router.route("/api/user/:email").get(signupController.findUser);
})
router.post("/api/users/",(req,res)=>{
    router.route("/api/users/").post(signupController.createUser);
});


module.exports=router;