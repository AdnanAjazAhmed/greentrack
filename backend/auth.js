var express = require('express');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var User = require('./models/user.js');

router.post('/register', (req, res) =>{
        let userData = req.body;
        console.log(userData);
        let user = new User(userData);
      
        user.save((err, result)=>{
           if(err){
               console.log("Having trouble  Adding User")
           } else {
               res.sendStatus(200);
           }
        })
    })

    router.post('/login', async (req, res) =>{
        let userData = req.body;
        let user = await User.findOne({email: userData.email});
    
        
        if(!user){
            return res.status(401).send({ message: "User Does not Exist"})
        }
    
        bcrypt.compare(userData.password, user.password, (err, isMatch) =>{
            if(!isMatch){
                return res.status(401).send({ message: "Email or Password Invalid!"})
            }
    
    
            
        let payload = {}
        
        let token = jwt.encode(payload, '123')
    
        res.status(200).send({token})
    
        })
})

module.exports = router