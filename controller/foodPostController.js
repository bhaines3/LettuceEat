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
          DonorId: req.body.DonorId,
          title:req.body.title,
          desc:req.body.desc,
          pickupdate:req.body.pickupdate,
          enddate: req.body.enddate,
          pickupwindow: req.body.pickupwindow
      }
      db.FoodPost.create(newFoodPostInfo)
      .then((dbFoodPost)=> {
          console.log("FoodPost created");
          res.json(dbFoodPost);
      }).catch(function(err) {
        console.log("Erro: "+err);
      });
    },
    updateFoodPost: (req, res) => {
      db.FoodPost.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(function(dbFoodPost) {
        res.json(dbFoodPost);
      }).catch(function(e) {
        console.warn(e);
      })
    },
    deleteFoodPost: (req, res) => {
      db.FoodPost.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbFoodPost) {
        res.json(dbFoodPost);
      }).catch(function(e) {
        console.warn(e);
      });
    }
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