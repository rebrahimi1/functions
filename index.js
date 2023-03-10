require('dotenv').config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(process.env.KEY_FILE_NAME)
  });
const Firestore = require('@google-cloud/firestore');
const express = require("express");
const cors = require("cors");
const userServices = require('./models/user');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cors(), express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});


app.get("/", async (req, res) => {
    let result = await userServices.getInfo();
    res.send(result);
});




exports.app = functions.https.onRequest(app);



