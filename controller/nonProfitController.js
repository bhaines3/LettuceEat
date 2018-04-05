const db = require("../models");
module.exports = {
    findAllNonProfit:(req,res)=>{
      db.NonProfit.findAll().then((dbNonProfit)=>{
        console.log(dbNonProfit)
        res.json(dbNonProfit);
      })
    },
    findNonProfit: (req, res) =>{
      db.NonProfit.findOne({
        where:{
            email:req.queryEmail
        }
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
      }).catch(function(err) {
        console.log("Erro: "+err);
      });
    }
}
