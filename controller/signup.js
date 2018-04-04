const db = require("../models");

module.exports = {

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
      const unhashedPassword=req.query.password;
      //encrypt password
      const rounds= bcrypt.genSaltSync();
      let hashedPassword = bcrypt.hashSync(password, rounds);
      
      const newUserinfo={
          email:req.query.email,
          name:req.query.name,
          isDonor:req.query.isDonor,
          phonenumber:req.query.phonenumber,
          password:hashedPassword
      }
      //creating new user
      db.User.create(newUserinfo)
      .then((dbUser)=> {
        res.json(dbUser);
      }).catch(function(err) {
      });
    }
}
