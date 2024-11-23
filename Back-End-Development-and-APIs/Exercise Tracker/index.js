const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/user');
const Exercise = require('./models/exercise');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');


const MONGODB_URI = process.env.MONGO_URI;

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// /api/users => POST
app.post('/api/users', (req, res, next) => {
  const username = req.body.username;

  const user = new User({
      username: username
  });

  user.save().then( (savedUser) => {
      console.log('User Created!');
      res.json({username: savedUser.username, _id: savedUser._id});
  }).catch( (err) => {
      console.log(err);
      res.json({error: 'Something wrong creating user'});
  });
})

// /api/users => GET
app.get('/api/users', (req, res, next) => {
  User.find().then( (users) => {
    res.json(users);
  }).catch( (err) => {
    console.log(err);
    res.json({error: 'Something wrong, try again later'});
  })
});

// /api/users/:userId/exercises => POST
app.post('/api/users/:userId/exercises',
  [
    body('description').trim().not().isEmpty(),
    body('duration').isNumeric().not().isEmpty(),
  ], (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.json({error: 'Description (Text) and Duration (Numeric) fields required'});
    }

    const userId = req.params.userId;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date === '' ? new Date().toDateString() : new Date(req.body.date).toDateString();
    // check date
    if (date === 'Invalid Date') {
      return res.json({error: 'Invalid Date'});
    }
    User.findOne({_id: userId}).then( (user) => {
      // check user
      if (!user){
        return res.json({error: 'No user found'});
      }
      // user exists
      const exercise = new Exercise({
        username: user.username,
        description: description,
        duration: duration,
        date: date,
        userId: user._id
      })
      exercise.save().then( (result) => {
        res.json({
          _id: result.userId,
          username: result.username,
          date: result.date.toDateString(),
          duration: result.duration,
          description: result.description
        });
      }).catch( err => {
        console.log(err);
        res.json({error: 'Something wrong, try again later'})
      })

    }).catch( err => {
      console.log(err);
      res.json({error: 'Something wrong, try again later'})
    })
});


// /api/users/:userId/logs => GET
app.get('/api/users/:userId/logs', (req, res, next) => {
  const userId = req.params.userId;
  const from = new Date(req.query.from).toString() === 'Invalid Date' ? new Date('0000') : new Date(req.query.to);
  const to = new Date(req.query.to).toString() === 'Invalid Date' ? new Date('3000') : new Date(req.query.to);
  const limit = Number(req.query.limit).toString() === 'NaN'? 0 : Number(req.query.limit);
  

  User.findOne({_id: userId}).then( (user) => {
    // check user
    if (!user){
      return res.json({error: 'No user found'});
    }
    // user exits
    Exercise.find({userId: userId, date:{ $gte: from, $lte: to} }).limit(limit).then( (exercises) => {
      const result = {
        _id: userId,
        username: user.username,
        count: exercises.length,
        log: exercises.map( (value) => {
          return {
            description: value.description,
            duration: value.duration,
            date: value.date.toDateString()
          }})
      };
      res.json(result);
    })

    

  }).catch( err => {
    console.log(err);
    res.json({error: 'Something wrong, try again later'})
  });


});



mongoose.connect(MONGODB_URI).then( () => {
  console.log('DB: Connected');
  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })
}).catch(err => console.log(err));