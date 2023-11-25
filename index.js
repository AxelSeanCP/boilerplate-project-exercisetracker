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



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
