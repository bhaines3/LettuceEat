const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
    findAllusers:(req,res)=>{
      db.User.findAll().then((dbUser)=>{
        console.log(dbUser)
        res.json(dbUser);
      })
    },
    findUser: (req, res) =>{
      //find user if already exists
      db.User.findOne({
        where:{
            email:req.queryEmail
        }
      }).then((user)=>{
        res.json(user);
      })
    },
    createUser: (req, res)=> {
      const password=req.query.password;
      //encrypt password
      //const salt= bcrypt.genSaltSync(10);
      //let hashedPassword = bcrypt.hashSync(password, salt);
      
      const newUserinfo={
          email:req.query.email,
          name:req.query.name,
          isDonor:req.query.isDonor,
          phonenumber:req.query.phonenumber,
          password:password
      }
      console.log("about to create user");
      //creating new user
      db.User.create(newUserinfo)
      .then((dbUser)=> {
        res.json(dbUser);
      }).catch(function(err) {
      });
    }
}
