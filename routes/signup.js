const router = require("express").Router();
const bcrypt = require("bcrypt");
// Requiring our models for syncing
const db = require("./models");

router.post("api/users",(req,res)=>{
    const unhashedPassword=req.body.password;
    //encrypt password
    const rounds= bcrypt.genSaltSync();
    let hashedPassword = bcrypt.hashSync(password, rounds);
    
    const newUserinfo={
        email:req.body.email,
        name:req.body.name,
        password:hashedPassword
    }
    //creating new user
    //should check if user doesnt exist already
    db.User.findOne({
        where:{
            email:newUserinfo.email
        }
    }).then((userfound)=>{
        //if user doesnot exist create new user
        if(!userInfo){
            db.User.create(newUserinfo)
            .then(function(dbUser) {
                res.json(dbUser);
            });
        }
    })
    
});

module.exports=router;