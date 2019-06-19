//    WBM >> will be moved
const express = require('express'); // WBM - server
const helmet = require('helmet'); // WBM - server
const cors = require('cors'); // WBM - server
const bcrypt = require('bcryptjs');   // WBM - server

const db = require('./data/dbConfig.js');  // WBM - router
const Users = require('./users/users-model.js'); // WBM to specific router

const server = express();   // WBM - server


// ALL WBM - server
server.use(helmet());   // hides X-Powered by -> Express
server.use(express.json());   // parses incoming requests
server.use(cors());


// WBM - server
// root access sanity check
server.get('/', (req, res) => {
    res.send(` <h2> WebAuthorization SANITY Check !!! </h2>`)
});



// helper functions WBM - specific model
// Creates the Account Login - we MUST hash the password, adds to user table
//  username: groot      // add numbers to this to keep testing simple
//  password: iamgroot   // add numbers to this to keep testing simple

server.post('/api/register', (req, res) => {
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
  
    // this auto-gens salt & hash, time complexity of 2^14 
    const hash = bcrypt.hashSync(user.password, 14); // will loop hash 4096 times
    user.password = hash;
  
    console.log('>>> user obj is ', user);
    console.group();
    console.log('### number of hash rounds used ', bcrypt.getRounds(hash));
    console.log('$$$ the salt portion used for hash ', bcrypt.getSalt(hash));
  
    user.numRounds = bcrypt.getRounds(hash);
    user.salt = bcrypt.getSalt(hash);

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });







//  STAYS
const port = process.env.PORT || 5001;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));