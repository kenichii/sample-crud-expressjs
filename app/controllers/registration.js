const mongoose = require('mongoose');
const collection = "registration";
const db = require("./db");


exports.registration_list = (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if (err) {
            console.log(err);
        } else {
            console.log(documents);
            res.json(documents);
        }
    });
}

exports.update_user = (req, res) => {
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
    });
}
exports.post_new = (req, res) => {
    const userId = req.body;
    db.getDB().collection(collection).insertOne(userId, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json({result: result, documents: result.ops[0]})
    });
}
exports.delete_user = (req, res) => {
    const userId = req.params.id;
    db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(userId)}, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    });
}
db.connect((err) => {
    if (err) {
        console.log('unable to connect to database');
        process.exit(1);
    } else {
        app.listen(3000, () => {
            console.log('connected to database, app listening on port 3000')
        });
    }
});
