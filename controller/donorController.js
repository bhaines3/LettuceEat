const db = require("../models");
const foodPostController=require("../controller/foodPostController.js");
module.exports = {
    findAllDonors:(req,res)=>{
      db.Donor.findAll({
        include: [db.FoodPost]
      }).then((dbDonor)=>{
        res.json(dbDonor);
      })
    },
    findDonor: (req, res) =>{
      // console.log("yo"+JSON.stringify(req.query));   
      db.Donor.findOne({
        where:{
          id: req.params.id
        },
        include: [db.FoodPost]
      }).then((donor)=>{
        res.json(donor);
      })
    },
    findDonorByFoodPostId: (req, res) => {
      db.FoodPost.findOne({
        where: {
          id: req.params.id
        }
      }).then((foodpost)=>{
        db.Donor.findOne({
          where: {
            id: foodpost.DonorId
          }
        }).then((donorFoodPost)=>{
          res.json(donorFoodPost);
        })
      })
    },
    createDonor: (req, res)=> {
      var newDonorInfo={
          UserId: req.UserId,
          location:req.location,
          email:req.email,
          name:req.name,
          phonenumber:req.phonenumber
      }
      db.Donor.create(newDonorInfo)
      .then((dbDonor)=> {
          console.log("Donor created");
          res.json(dbDonor);
      }).catch(function(err) {
        console.log("Erro: "+err);
      });
    }
}
