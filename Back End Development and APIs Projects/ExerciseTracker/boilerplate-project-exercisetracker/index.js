const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var users =[];
let nextUserId = 1;

app.post('/api/users', (req, res) => {
  const { username } = req.body;
  const newUser = { username, _id: nextUserId++ };
  users.push(newUser);
  res.json(newUser);
});

app.get('/api/users', (req, res) => {
  const formattedUsers = users.map(user => {
    return { username: user.username, _id: user._id.toString() };
  });

  res.json(formattedUsers);
});

app.post('/api/users/:_id/exercises', (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  const user = users.find(user => user._id === parseInt(_id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const exercise = {
    username: user.username,
    description,
    duration: parseInt(duration),
    date: date ? new Date(date).toDateString() : new Date().toDateString(),
    _id: user._id
  };

  if (!user.exercises) {
    user.exercises = [exercise];
  } else {
    user.exercises.push(exercise);
  }

  res.json(exercise);
});

app.get('/api/users/:_id/logs', (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;

  const user = users.find(user => user._id === parseInt(_id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  let log = user.exercises || [];

  if (from) {
    log = log.filter(exercise => new Date(exercise.date) >= new Date(from));
  }
  if (to) {
    log = log.filter(exercise => new Date(exercise.date) <= new Date(to));
  }

  if (limit) {
    log = log.slice(0, parseInt(limit));
  }

  const response = {
    username: user.username,
    count: log.length,
    _id: user._id,
    log: log.map(({ description, duration, date }) => ({
      description,
      duration,
      date
    }))
  };

  res.json(response);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
