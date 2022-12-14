// imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const DataBase = require('./DataBase');
const usersRoute = require("./routes/users.route");
const https = require('https');

// setup
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/api/users', usersRoute);

// methods
app.get("/api", (req, res) => {
    res.json({ alive: true });
});

app.use('/', express.static('./public'));

// run App
DataBase.connect()
    .then(() => {
        const sslServer = https.createServer({
            key: process.env.SSL_KEY,
            cert: process.env.SSL_CERT
        }, app);
        sslServer.listen(PORT, () => console.log('Server: ', `Connected to http://localhost:${PORT}`));
    });