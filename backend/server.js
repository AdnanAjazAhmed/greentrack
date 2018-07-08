var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var auth = require('./auth');
const port =  3000;


var User = require('./models/user.js');
var Location = require('./models/getlocation.js');

var posts = [ 
    { message : 'Welcome to the GTS Portal'},
    { message : ' Time to Track you Electronic waste' }
]

var trackerInfo = [
    { message: 'tracker is located in santa clara'}
]

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) =>{
    console.log("Browser Has Been Opened");
    res.send(trackerInfo);
});

app.post('/location', (req, res)=>{
   var location = new Location(req.body);

   location.save((err, result)=>{
       if(err){
           console.error('Saving Current location error');
           return res.status(500).send({message :'Saving location Error' });
       }
       res.sendStatus(200);
   })
})


app.get('/users', async (req, res)=>{
    try {
        let users = await User.find({}, '-password -__v');
        res.send(users);
    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
    
});

app.get('/profile/:id', async (req, res)=>{
    try {
        let user = await User.findById(req.params.id, '-password -__v');
        res.send(user);
    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
    
});

/*app.post('/register', auth.register);

app.post('/login', auth.login); */


mongoose.connect('mongodb://admin:admin123@ds147030.mlab.com:47030/greentrack',(err)=>{
    if(!err){
        console.log('Connected the the GTS database');
    }
})

app.use('/auth', auth);

app.listen(port);