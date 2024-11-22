// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// /api/:date => GET
app.get('/api/:date' , (req, res, next) => {
  // case date = 'YYYY-MM-DD'
  let date = new Date(req.params.date);
  if (date.toString() === 'Invalid Date') {
    // case date = Number
    date = new Date(Number(req.params.date));
  }
  if (date.toString() === 'Invalid Date') {
    // Invalid Date
    res.json({error: 'Invalid Date'});
  } else {
    res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
});

// /api => GET
app.get('/api', (req, res, next) => {
  const date = new Date();
  const unix = date.getTime();
  const utc = date.toUTCString();
  res.json({unix: unix, utc: utc});
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
