const usersRoute = require("express").Router();
const usersSchema = require('../models/Users.model');
const bcrypt = require("bcrypt");
const controller = require("../controllers/users.controllers");
const middleware = require("../middleware/users.middleware");
const v = require("../models/vacation.model");

usersRoute.post("/signup", controller.post_signup);

usersRoute.post("/login", controller.post_login);

usersRoute.get("/all", async (req, res) => {
    // let newV = new v({ name: "Hawai", startDate: Date.now(), endDate: Date.now() })
    // await newV.save();
    usersSchema.findById('63430348bbf25cb2bbb6126c')
        .populate('following')
        .then((result) => {
            if (result) {
                res.json({ user: result });
            }
        })
});


usersRoute.get("/single/:id", middleware.getUserWithID, (req, res) => {
    res.status(200).json({ user: req.user });
});

usersRoute.delete("/:id", middleware.getUserWithID, (req, res) => {
    try {
        req.user.remove();
        res.status(200).json({ message: "user was deleted", success: true });
    } catch (error) {
        res.status(500).json({ message: "user was not deleted", success: false });
    }
});

usersRoute.patch("/:id", middleware.getUserWithID, async (req, res) => {
    try {

        usersSchema.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
            if (err != null) {
                res.status(500).json({ message: err.message, success: false });
                return;
            } else {
                res.status(200).json({ message: "user has been updated", success: true });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

module.exports = usersRoute;