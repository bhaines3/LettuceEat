const db = require("../models");
module.exports = {
    findAllPosts:(req,res)=>{
      db.FoodPost.findAll({
        include: [db.Donor, db.NonProfit]
      }).then((dbFoodPost)=>{
        res.json(dbFoodPost);
      })
    },
    findOneFoodPost: (req, res) =>{
      db.FoodPost.findOne({
        where:{
            id: req.params.id
        },
        include: [db.Donor, db.NonProfit]
      }).then((foodPost)=>{
        res.json(foodPost);
      })
    },
    filterFoodPostsByDonor: (req,res) => {
      db.FoodPost.findAll({
        where: {
          DonorId: req.params.id
        },
        include: [db.Donor, db.NonProfit]
      }).then((foodPost) => {
        res.json(foodPost)
      })
    },
    createFoodPost: (req, res)=> {
      var newFoodPostInfo={
          DonorId: req.DonorId,
          title:req.title,
          desc:req.desc,
          pickupdate:req.pickupdate,
          enddate: req.enddate,
          pickupwindow: req.pickupwindow
      }
      db.FoodPost.create(newFoodPostInfo)
      .then((dbFoodPost)=> {
          console.log("FoodPost created");
          res.json(end);
      }).catch(function(err) {
        console.log("Erro: "+err);
      });
    },
    //IMPLEMENT THIS LATER
    // updateFoodPost: (req, res) => {
    //   db.FoodPost.findOne({
    //     where: {
    //       id: req.foodPostId
    //     }
    //   }).then((updatedFoodPost) => {
    //     res.json(updatedFoodPost)
    //   })
    // }
}