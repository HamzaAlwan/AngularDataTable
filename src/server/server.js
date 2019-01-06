var express = require('express');
var upload = require('express-fileupload');
var path = require('path');
var bodyParser = require('body-parser');
var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;
var db = require('./database/db.js');


var app = express();



app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(upload());


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/resumes', function (req, res) {
    res.sendFile(__dirname + '/resumes.html');
});

app.get('/messages', function (req, res) {
    res.sendFile(__dirname + '/messages.html');
});

app.get('/Thankyou', function (req, res) {
    res.sendFile(__dirname + '/ThankYou.html');
});


app.listen(app.get('port'), function () {
    console.log("NodeJs Connected on " + 3000)
});


app.post('/', (req, res) => {
    req.body.resume = JSON.stringify(req.files.resume);
    req.body.name = req.body.name.toLowerCase();
    var myData = new db.User(req.body);
    myData.save()
        .then(item => {
            res.redirect('/Thankyou');
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.post('/message', (req, res) => {
    var message = new db.Messages(req.body);
    message.save()
        .then(item => {
            res.redirect('/Thankyou');
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.get('/applicants', (req, res) => {
    db.User.find()
        .then(users => {
            var i, applicants = []
            for (i = 0; i < users.length; i++) {
                users[i].resume = JSON.parse(users[i].resume).name
                applicants.push(users[i])
            }
            res.send(applicants)
        })
        .catch(err => console.log(err));
});

app.get('/msg', (req, res) => {
    db.Messages.find()
        .then(msg => {
            res.send(msg)
        })
        .catch(err => console.log(err));
});

app.post('/resume', function (req, res) {

    var promise = new Promise(function (resolve, reject) {
        resolve('Success!');
    });
    var id = req.body.id
    db.User.findOne({
            _id: id
        })
        .then(resume => {
            res.send(resume)
        })
        .catch(err => console.log(err));
})