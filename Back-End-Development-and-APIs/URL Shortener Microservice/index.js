require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


let urls = [];

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// /api/shorturl => POST
app.post('/api/shorturl', (req, res, next) => {
  try {
    // check url
    const url = new URL(req.body.url);
    if (url.protocol === 'https:' || url.protocol === 'http:'){
      // valid url
      let index = urls.findIndex( value => value === req.body.url);
      if ( index === -1){
        // url does not exist, save url
        index = urls.length;
        urls.push(req.body.url);
        res.json({original_url: req.body.url, short_url: index});
      } else {
        // url exists
        res.json({original_url: req.body.url, short_url: index});
      }
    } else {
      res.json({error: 'Invalid URL'});  
    }
  } catch (err) {
    res.json({error: 'Invalid URL'});
  }
});

// /api/shorturl/:shortUrl => GET
app.get('/api/shorturl/:shortUrl', (req, res, next) => {
  const shortUrl = req.params.shortUrl;
  const newUrl = urls[parseInt(shortUrl)];
  if (newUrl != undefined) {
    res.redirect(newUrl);
  } else {
    res.json({error: 'invalid url'});
  }
});






app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
