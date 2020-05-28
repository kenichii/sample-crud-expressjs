const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const db = require("./db");
const collection = "registration";

// HTTP request logger
app.use(morgan('tiny'));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.get('/getList', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if (err) {
            console.log(err);
        } else {
            console.log(documents);
            res.json(documents);
        }
    });
});

app.put('/List/:id', (req, res) => {
    const registrationId = req.params.id;
    const userInput = req.body;

    db.getDB().collection(collection).findOneAndUpdate({_id: db.getPrimaryKey(registrationId)}, {
        $set: {
            fullname: userInput.fullname,
            birthday: userInput.birthday,
            address: userInput.address,
            gender: userInput.gender
        }
    }, {returnOriginal: false}, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    })
});

app.post('/List', (req, res) => {
    const userId = req.body;
    db.getDB().collection(collection).insertOne(userId, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json({result: result, documents: result.ops[0]})
    });
});

app.delete('/List/:id', (req, res) => {
    const userId = req.params.id;
    db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(userId)}, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    });
});

app.get('/SearchUser/:fullName', (req, res) => {
    const fullname = req.params.fullName;
    console.log(fullname);
    if (fullname !== '' || fullname !== ' ') {
        db.getDB().collection(collection).find({"fullname": {$regex: new RegExp(".*" + fullname + ".*", "i")}}).toArray((err, result) => {
            if (err)
                console.log(err);
            else
                res.json(result);
        })
    } else {
        db.getDB().collection(collection).find({}).toArray((err, documents) => {
            if (err) {
                console.log(err);
            } else {
                console.log(documents);
                res.json(documents);
            }
        });
    }
});

app.delete('/deleteAll', () => {
    db.getDB().collection(collection).remove();
});

app.get('/GetUser/:id', (req, res) => {
    const UserId = req.params.id;
    db.getDB().collection(collection).findOne({_id: db.getPrimaryKey(UserId)}, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    });
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

module.exports = app;
