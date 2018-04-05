const db = require("../models");
module.exports = {
    findAllNonProfit:(req,res)=>{
      db.NonProfit.findAll({
        include: [db.FoodPost]
      }).then((dbNonProfit)=>{
        console.log(dbNonProfit)
        res.json(dbNonProfit);
      })
    },
    findNonProfit: (req, res) =>{
      db.NonProfit.findOne({
        where:{
            email:req.queryEmail
        },
        include: [db.FoodPost]
      }).then((nonprofit)=>{
        res.json(nonprofit);
      })
    },
    createNonProfit: (req, res)=> {
      var newNonProfitInfo={
          UserId: req.UserId,
          email:req.email,
          name:req.name,
          phonenumber:req.phonenumber
      }
      db.NonProfit.create(newNonProfitInfo)
      .then((dbNonProfit)=> {
          console.log("NonProfit created");
          res.json(end);
      }).catch((err) => {
        console.log("Erro: "+err);
      });
    },
    // addInterest: (req, res) => {
    //   db.NonProfit.findOne({
    //     where: {
    //       id: req.nonProfitId (pass the nonprofit id)
    //     }
    //   }).then((thisNonProfit) => {
    //     db.FoodPost.findOne({
    //       where: {
    //         id: req.foodPostId (pass the foodpost id)
    //       }
    //     }).then((thisFoodPost) => {
    //       thisNonProfit.addFoodPost(thisFoodPost);
    //     })
    //   })
    // },
    // removeInterest: (req, res) => {
    //   db.NonProfit.findOne({
    //     where: {
    //       id: req.nonProfitId (pass the nonprofit id)
    //     }
    //   }).then((thisNonProfit) => {
    //     db.FoodPost.findOne({
    //       where: {
    //         id: req.foodPostId (pass the foodpost id)
    //       }
    //     }).then((thisFoodPost) => {
    //       thisNonProfit.removeFoodPost(thisFoodPost);
    //     })
    //   })
    // }
}
