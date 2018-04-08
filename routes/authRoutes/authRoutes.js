var express = require('express');
var router = express.Router();
const usersController=require("../../controller/usersController.js");

router.post('/signup', usersController.createNewuser);

router.post('/login',usersController.findOneuser);

module.exports=router;