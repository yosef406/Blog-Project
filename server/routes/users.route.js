const usersRoute = require("express").Router();
const usersSchema = require('../models/Users.model');
const bcrypt = require("bcrypt");
const controller = require("../controllers/users.controllers");
const middleware = require("../middleware/users.middleware");

usersRoute.post("/signup", controller.post_signup);

usersRoute.post("/login", controller.post_login);

usersRoute.get("/all", (req, res) => {
    res.send("all user");
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