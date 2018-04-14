var express = require('express');
var router = express.Router();
const usersController=require("../../controller/usersController.js");

router.post('/signup', usersController.createNewUser);

router.post('/login',usersController.verifyLogin);

module.exports=router;