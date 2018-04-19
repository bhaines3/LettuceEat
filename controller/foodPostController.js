const db = require("../models");
module.exports = {
    findAllPosts: (req, res) => {
        db.FoodPost.findAll({
            include: [db.Donor, db.NonProfit]
        }).then((dbFoodPost) => {
            res.json(dbFoodPost);
        })
    },
    findOneFoodPost: (req, res) => {
        db.FoodPost.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Donor, db.NonProfit]
        }).then((foodPost) => {
            res.json(foodPost);
        })
    },
    filterFoodPostsByDonor: (req, res) => {
        db.FoodPost.findAll({
            where: {
                DonorId: req.params.id
            },
            include: [db.Donor, db.NonProfit]
        }).then((foodPost) => {
            res.json(foodPost)
        })
    },
    createFoodPost: (req, res) => {
        if (!req.user) {
            res.status(403).send("You aren't signed in!");
            return;
        }
        if (req.user.Donor.id == req.body.DonorId) {
            var newFoodPostInfo = {
                DonorId: req.body.DonorId,
                title: req.body.title,
                desc: req.body.desc,
                pickupdate: req.body.pickupdate,
                pickupwindow: req.body.pickupwindow
            }
            db.FoodPost.create(newFoodPostInfo)
                .then((dbFoodPost) => {
                    res.json({ success: true, msg: 'Successful created new foodpost.' });
                }).catch(function (err) {
                    res.status(403).send("Something went wrong!");
                });
        }
        else {
            res.status(403).send("You are not allowed to edit another user's post!");
            return;
        }
    },
    updateFoodPost: (req, res) => {
        if (!req.user) {
            res.status(403).send("You aren't signed in!");
            return;
        }
        if (req.user.Donor.id == req.body.DonorId) {
            db.FoodPost.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
                .then(function (dbFoodPost) {
                    res.json(dbFoodPost);
                }).catch(function (e) {
                    res.status(403).send("Something went wrong!");
                })
        }
        else {
            res.status(403).send("You are not allowed to edit another user's post!");
            return;
        }
    },
    deleteFoodPost: (req, res) => {
        if (!req.user) {
            res.status(403).send("You aren't signed in!");
            return;
        }
        if (req.user.Donor.id == req.params.donorId) {
            db.FoodPost.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(function (dbFoodPost) {
                    res.json(dbFoodPost);
                }).catch(function (e) {
                    console.warn(e);
                });
        }
        else {
            res.status(403).send("You are not allowed to edit another user's post!");
            return;
        }
    },
    clearAllFoodPosts: (req, res) => {
        db.FoodPost.destroy({
            where: {}
        }).then((dbFoodPost) => {
            res.json(dbFoodPost);
        }).catch((err) => {
            console.log("Error from clearAllFoodPosts: " + err);
        })
    }
}