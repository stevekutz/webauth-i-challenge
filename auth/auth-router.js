const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Auth = require('./auth-model');

const restrictedMW = require('../myMiddleware/myMiddleWare');



// Creates the Account Login - we MUST hash the password, adds to user table
//  username: groot      // add numbers to this to keep testing simple
//  password: iamgroot   // add numbers to this to keep testing simple
router.post('/register', (req,res) => {
    let user = req.body;

    // Make sure no blank info provided
    if( !user.username || !user.password) {
        return res.status(500).json({
           message: "Provide a username and password"
        })
      }
   
     // We can add other kinds of password checks up here before proceeding such as
     if(user.password.length < 8) {
       return res.status(400).json({
         message: `Password must be at least 8 chars`
       });
     }

    const hash =bcrypt.hashSync(user.password, 14); // 2^14
    user.password = hash;

     //  DEBUGGING STUFF
     console.log('>>> user obj is ', user);
     console.group();
     console.log('### number of hash rounds used ', bcrypt.getRounds(hash));
     console.log('$$$ the salt portion used for hash ', bcrypt.getSalt(hash));
     // EXTRA STUFF added to db
     user.numRounds = bcrypt.getRounds(hash);
     user.salt = bcrypt.getSalt(hash);

    Auth.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json(err);
        })

})


module.exports = router;