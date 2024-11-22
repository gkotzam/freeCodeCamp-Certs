let express = require('express');
let path = require('path');
require('dotenv').config();
let bodyParser = require('body-parser');


let app = express();

app.use('/public', express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.post('/name', (req, res, next) => {
    console.log('test');
    console.log(req.body);
    res.json({message: "ok"});
});


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

app.get('/:word/echo', (req, res, next) => {
    const word = req.params.word;
    res.json({echo: word});
});

app.get('/name', (req, res, next) => {
    const first = req.query.first;
    const last = req.query.last;
    res.json({name: first + ' ' + last});
});

app.post('/name', (req, res, next) => {
    const first = req.body.first;
    const last = req.body.last;
    res.json({name: first + ' ' + last});
});













 module.exports = app;
