const db = require("../models");
module.exports = {
    findAllNonProfits:(req,res)=>{
      db.NonProfit.findAll({
        include: [db.FoodPost]
      }).then((dbNonProfit)=>{
        res.json(dbNonProfit);
      })
    },
    findNonProfit: (req, res) =>{
      db.NonProfit.findOne({
        where:{
            id: req.params.id
        },
        include: [db.FoodPost]
      }).then((nonprofit)=>{
        res.json(nonprofit);
      })
    },
    createNonProfit: (req, res)=> {
      var newNonProfitInfo={
          UserId: req.UserId,
          location:req.location,
          email:req.email,
          name:req.name,
          phonenumber:req.phonenumber
      }
      db.NonProfit.create(newNonProfitInfo)
      .then((dbNonProfit)=> {
          console.log("NonProfit created");
          res.json(dbNonProfit);
      }).catch((err) => {
        console.log("Erro: "+err);
      });
    },
    addInterest: (req, res) => {
      db.NonProfit.findOne({
        where: {
          id: req.body.nonProfitId
        }
      }).then((thisNonProfit) => {
        db.FoodPost.findOne({
          where: {
            id: req.body.foodId
          }
        }).then((thisFoodPost) => {
          thisNonProfit.addFoodPost(thisFoodPost);
          res.end();
        })
      })
    },
    removeInterest: (req, res) => {
      db.NonProfit.findOne({
        where: {
          id: req.body.nonProfitId
        }
      }).then((thisNonProfit) => {
        db.FoodPost.findOne({
          where: {
            id: req.body.foodId
          }
        }).then((thisFoodPost) => {
          thisNonProfit.removeFoodPost(thisFoodPost);
          res.end();
        })
      })
    }
}
