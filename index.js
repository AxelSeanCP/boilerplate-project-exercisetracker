const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// connect to database
mongoose.connect(process.env.MONGO_URI, { useNewURLParser: true, useUnifiedTopology: true });

// check connection to database
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, "connection error:"));
connection.on('open', () => {
  console.log("Connected to the database")
});

// define user model
const logSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, {_id: false});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  logs: [logSchema]
});

let User = mongoose.model('User', userSchema);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// POST METHODS API
app.post('/api/users', (req,res) => {
  const userBaru = new User({
    username: req.body.username
  });

  userBaru.save().then(() => {
    console.log("New user added successfully!");
    res.json({username: req.body.username, _id: userBaru._id});
  }).catch((err) => {
    console.error(err,"Failed to add new user!");
    res.json({error: "failed to add user"});
  });
});

app.post('/api/users/:_id/exercises', async (req,res) => {
  try {
    const user = await User.findOne({_id: req.params._id});
    
    if(!user){
      res.json({error: "failed to find user"});
    }else{
      const desc = req.body.description;
      const dur = req.body.duration;
      const date = req.body.date;
      
      const exercise = {
        description: desc,
        duration: dur,
        date: date
      }
      
      user.logs.push(exercise);
      
      await user.save();
      console.log(`${user.username} successfully added new exercise!`);

      res.json({
        _id: user._id,
        username: user.username,
        description: desc,
        duration: dur,
        date: date
      });
    }
  } catch (error) {
    console.error(error);
    res.json({error: 'internal server error'});
  }
});
  
// GET METHODS API
app.get('/api/users', async (req,res) => {
  try {
    
    const database = [];

    for await (const user of User.find()){
      const data = {
        username: user.username,
        _id: user._id
      }
  
      database.push(data);
    }

    res.send(database);

  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'internal server error'});
  }
});

app.get('/api/users/:_id/logs', async (req,res) => {
  try {
    const user = await User.findOne({_id: req.params._id});

    if(!user){
      res.json({error: 'failed to find user'});
    }else{

      const logsFormatted = user.logs.map(log => ({
        description: log.description,
        duration: log.duration,
        date: log.date.toDateString()
      }));

      res.json({
        _id: user._id,
        username: user.username,
        count: user.logs.length,
        logs: logsFormatted
      });

    }
  } catch (error) {
    console.error(error);
    res.json({error: 'internal server error'});
  }
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
