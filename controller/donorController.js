const db = require("../models");
module.exports = {
    findAllDonor:(req,res)=>{
      db.Donor.findAll().then((dbDonor)=>{
        console.log(dbDonor)
        res.json(dbDonor);
      })
    },
    findDonor: (req, res) =>{
      db.Donor.findOne({
        where:{
            email:req.queryEmail
        }
      }).then((donor)=>{
        res.json(donor);
      })
    },
    createDonor: (req, res)=> {
      var newDonorInfo={
          UserId: req.UserId,
          email:req.email,
          name:req.name,
          phonenumber:req.phonenumber
      }
      db.Donor.create(newDonorInfo)
      .then((dbDonor)=> {
          console.log("Donor created");
          res.json(end);
      }).catch(function(err) {
        console.log("Erro: "+err);
      });
    }
}
