let express = require('express');
let app = express();
let path = require('path');
require('dotenv').config();

app.use('/public', express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

// app.get('/json', (req, res, next) => {
//     res.json({message: 'Hello json'});
// });




app.get('/json', function(req, res) {
    if (process.env.MESSAGE_STYLE=="uppercase") {
    return res.json({ "message": "Hello json".toUpperCase()}) 
    } else {
    return res.json({ "message": "Hello json" })
  }})





















 module.exports = app;
