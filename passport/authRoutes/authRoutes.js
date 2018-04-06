var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var db = require("../../models/");
const usersController=require("../../controller/usersController.js");
//Test: test if trully secure: curl -i -H "Accept: application/json" localhost:3001/api/users

router.post('/signup', usersController.createNewuser);

router.post('/login',usersController.findOneuser);

module.exports=router;