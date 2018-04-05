const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
    findAllusers:(req,res)=>{
      db.User.findAll().then((dbUser)=>{
        //console.log(dbUser)
        res.json(dbUser);
      })
    },
    findOneuser: (req, res) =>{
      //find user if already exists
    
      const email=req.query.email
      console.log("Im the controller "+email);
      db.User.findOne({
        where:{
            email:email
        }
      }).then((dbUser)=>{
        //res.json(dbUser);
      }).catch(function(err) {
        console.log("Error from findOne: "+err);
      });
    },
    createUser: (req, res)=> {
      const password=req.body.password;
      //encrypt password
      const salt= bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(password, salt);
      
      const newUserinfo={
          email:req.body.email,
          name:req.body.name,
          isDonor:req.body.isDonor,
          phonenumber:req.body.phonenumber,
          password:hashedPassword
      }
      
      //console.log(newUserinfo);
      //console.log("right before going into database o create");
      //creating new user
      db.User.create(newUserinfo)
      .then((dbUser)=> {
        res.json(dbUser);
      }).catch(function(err) {
        console.log("Error from create: "+err);
      });
    }
}
