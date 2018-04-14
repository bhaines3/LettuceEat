const db = require("../models");
module.exports = {
    findAllNonProfits: (req, res) => {
        db.NonProfit.findAll({
            include: [db.FoodPost]
        }).then((dbNonProfit) => {
            res.json(dbNonProfit);
        })
    },
    findNonProfit: (req, res) => {
        db.NonProfit.findOne({
            where: {
                id: req.params.id
            },
            include: [db.FoodPost]
        }).then((nonprofit) => {
            res.json(nonprofit);
        })
    },
    createNonProfit: (req, res) => {
        var newNonProfitInfo = {
            UserId: req.UserId,
            location: req.location,
            email: req.email,
            name: req.name,
            phonenumber: req.phonenumber
        }
        return db.NonProfit.create(newNonProfitInfo)
            .then((dbNonProfit) => {
                console.log("NonProfit created");
                res.json(dbNonProfit);
            }).catch((err) => {
                console.log("Erro: " + err);
            });
    },
    updateNonProfit: (req, res) => {
        if (!req.user) {
            res.status(403).send("You aren't signed in!");
            return;
        }
        if (req.user.NonProfit.id == req.params.id) {
            db.NonProfit.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
                .then(function (dbNonProfit) {
                    res.json(dbNonProfit);
                }).catch(function (e) {
                    console.warn(e);
                })
        }
        else {
            res.status(403).send("You are not allowed to edit another user's post!");
            return;
        }
    },
    addInterest: (req, res) => {
        if (!req.user) {
            res.status(403).send("You aren't signed in!");
            return;
        }
        if (req.user.NonProfit.id == req.body.nonProfitId) {
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
        }
        else {
            res.status(403).send("You are not allowed to edit another user's post!");
            return;
        }
    },
    removeInterest: (req, res) => {
        if (!req.user) {
            res.status(403).send("You aren't signed in!");
            return;
        }
        if (req.user.NonProfit.id == req.body.nonProfitId) {
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
        else {
            res.status(403).send("You are not allowed to edit another user's post!");
            return;
        }
    }
}
