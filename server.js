// Require packages 
const express = require("express");
const mongodb = require("mongodb").MongoClient;
const cors = require("cors");

// Set up app with express
const app = express();

// Set up database
let db;

// Connect to mongodb from server
let connectionString = "mongodb://localhost:27017/web-traveldestinations";

mongodb.connect(
    connectionString,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err, client) => {
        db = client.db();
        app.listen(3000);
    }
);


// Set up app settings
app.use(express.json());
app.use(cors());

// HTTP POST method
app.post("/traveldestination", (req,res) => {
    const travelDestination = {
        title: req.body.title,
        description: req.body.description,
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo,
        country: req.body.country,
        location: req.body.location,
        googleMapsLink: req.body.googleMapsLink,
    };

    db.collection("traveldestinations").insertOne(travelDestination, (err,info) => {
            res.status(201);
            res.send("Got a POST request");            
        }
    );
});

// HTTP GET method
app.get("/traveldestination", (req,res) => {
    db.collection("traveldestinations").find().toArray(
        (err, items) => {
            res.status(200);
            res.send(items);
        }
    );
})