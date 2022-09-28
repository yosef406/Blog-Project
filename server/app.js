// imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const DataBase = require('./DataBase');
const usersRoute = require("./routes/users.route");

// setup
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/users', usersRoute);

// methods
app.get("/", (req, res) => {
    res.json({ alive: true });
});

// run App
DataBase.connect()
    .then(() => {
        app.listen(PORT, () => console.log('Server: ', `Connected to http://localhost:${PORT}`));
    });