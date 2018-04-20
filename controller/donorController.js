const db = require("../models");

module.exports = {
    findAllDonors: (req, res) => {
        db.Donor.findAll({
            include: [db.FoodPost]
        }).then((dbDonor) => {
            res.json(dbDonor);
        });
    },
    findDonor: (req, res) => {
        db.Donor.findOne({
            where: {
                id: req.params.id
            },
            include: [db.FoodPost]
        }).then((donor) => {
            res.json(donor);
        });
    },
    findDonorByFoodPostId: (req, res) => {
        db.FoodPost.findOne({
            where: {
                id: req.params.id
            }
        }).then((foodpost) => {
            db.Donor.findOne({
                where: {
                    id: foodpost.DonorId
                }
            }).then((donorFoodPost) => {
                res.json(donorFoodPost);
            });
        });
    },
    createDonor: (req, res) => {
        var newDonorInfo = {
            UserId: req.UserId,
            location: req.location,
            email: req.email,
            name: req.name,
            phonenumber: req.phonenumber
        };
        return db.Donor.create(newDonorInfo)
            .then((dbDonor) => {
                res.json({ success: true, msg: "Successful created new donor." });
            }).catch(function (err) {
                console.log("Erro: " + err);
            });
    },
    updateDonor: (req, res) => {
        if (!req.user) {
            res.status(403).send("You aren't signed in!");
            return;
        }
        if (req.user.Donor.id == req.params.id) {
            db.Donor.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
                .then(function (dbDonor) {
                    var updatedUser = {}
                    if (req.body.name) {
                        updatedUser["name"] = req.body.name;
                    }
                    if (req.body.email) {
                        updatedUser["email"] = req.body.email;
                    }
                    if (req.body.location) {
                        updatedUser["location"] = req.body.location;
                    }
                    if (req.body.phonenumber) {
                        updatedUser["phonenumber"] = req.body.phonenumber;
                    }
                    db.User.update(updatedUser, {
                        where: {
                            id: req.body.UserId
                        }
                    }).then(function (dbUser) {
                        res.json(dbUser);
                    })
                }).catch(function (error) {
                    res.status(403).send("Something went wrong!");
                });
        }
        else {
            res.status(403).send("You are not allowed to edit another user's post!");
            return;
        }
    },
    clearAllDonors: (req, res) => {
        db.Donor.destroy({
            where: {}
        }).then((dbDonor) => {
            res.json(dbDonor);
        }).catch((err) => {
            console.log("Error from clearAllDonors: " + err);
        });
    }
};
