var express = require('express');
var app = express.Router();
var mlab = require('../database_connection');
var db= new mlab();

/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index');
});

app.post('/', function (req, res) {
    console.log("messaggio salvato nel db:" + req.body.msg);
    res.json({msg:req.body.msg});
    db.insertMessage(req.body.msg);
});

module.exports = app;
