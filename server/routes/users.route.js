const express = require("express");
const usersRoute = express.Router();
const usersSchema = require('../models/Users.model');
// const cryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");

usersRoute.post("/signup", (req, res) => {
    let userBody = req.body;

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //! will change to create secure password
    let salt = bcrypt.genSalt(10);
    userBody.password = bcrypt.hash(userBody.password, salt);

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    let user = new usersSchema(userBody);

    user.save()
        .then(() => res.status(201).json({ message: "User was added to the DataBase.", success: true }))
        .catch((err) => res.status(400).json({ message: err.toString(), success: false }));
});

usersRoute.post("/login", (req, res) => {
    let { email, password } = req.body;
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //! hash the password
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // select name,email,password,_id from Users
    // WHERE email == users.email 
    usersSchema
        .findOne({ email }, { name: 1, email: 1, password: 1 })
        .then((result) => {
            if (result != null) {
                // ! test the password
                let validPass = result.password === "123xyz";

                if (validPass)
                    res.status(202).json({
                        message: "login success.",
                        success: true,
                        user: result,
                    });
                else
                    res.status(402).json({
                        message: "wrong email or password",
                        success: false,
                    });
            } else {
                res.status(402).json({
                    message: "wrong email or password",
                    success: false,
                });
            }
        }).catch((err) => res.status(500).json({ message: "you no get in hahahaha", success: false }));
});

usersRoute.get("/all", (req, res) => {
    res.send("all user");
});

usersRoute.get("/single/:id", (req, res) => {
    res.send("one user");
});

usersRoute.delete("/:id", (req, res) => {
    res.send("delete user");
});

usersRoute.patch("/:id", (req, res) => {
    res.send("update user");
});

module.exports = usersRoute;