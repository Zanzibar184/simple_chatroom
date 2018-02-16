var express = require('express');
var app = express.Router();
var mlab = require('../database_connection');
var db = new mlab();

/* GET home page. */
app.get('/', function(req, res) {
    res.render('index');
});


app.get('/chat', function(req, res) {
     db.getHistory(res);
});

app.post('/', function (req, res) {

    if(req.body.action === "insert")
    {
        console.log("messaggio salvato nel db:" + req.body.msg);
        res.json({msg:req.body.msg});
        db.insertMessage(req.body.msg, req.body.user);
    }

    if(req.body.action === "clear")
    {
        console.log("dropped table");
        db.dropTable();
    }

});

function prova(dati,res){
    console.log(dati);
    res.json(dati);
}

module.exports = app;
