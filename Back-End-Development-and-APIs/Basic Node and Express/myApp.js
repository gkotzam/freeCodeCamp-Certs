let express = require('express');
let path = require('path');
require('dotenv').config();


let app = express();

app.use('/public', express.static(path.join(__dirname,'public')));

app.use( (req, res, next) => {
    const method = req.method;
    const path = req.path;
    const ip = req.ip;
    console.log(method + ' ' + path + ' - ' + ip);
    next();
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.get('/json', function(req, res) {
    if (process.env.MESSAGE_STYLE=="uppercase") {
    return res.json({ "message": "Hello json".toUpperCase()}) 
    } else {
    return res.json({ "message": "Hello json" })
  }});


app.get('/now', function (req, res, next){
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({time: req.time});
});


















 module.exports = app;
