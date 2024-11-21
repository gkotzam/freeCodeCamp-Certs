let express = require('express');
let app = express();
let path = require('path');


app.use('/public', express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})


























 module.exports = app;
