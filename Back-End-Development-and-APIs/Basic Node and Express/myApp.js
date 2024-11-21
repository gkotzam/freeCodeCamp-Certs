let express = require('express');
let app = express();
let path = require('path');


app.use('/public', express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/json', (req, res, next) => {
    res.json({message: 'Hello json'});
});


























 module.exports = app;
