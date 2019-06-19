//    WBM >> will be moved
const express = require('express'); // WBM - server
const helmet = require('helmet'); // WBM - server
const cors = require('cors'); // WBM - server
const bcrypt = require('bcryptjs');   // WBM - server

// we import in customer middleware
const authorizeMW = require('./myMiddleware/myMiddleWare') 

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

// Authenticates User
// 
server.post('/api/login', (req, res) => {
    let { username, password } = req.body;   // Login creds passed in here
  
    Users.findBy({ username })
      .first()
      .then(user => {
  
        // Add BELOW    // user.password  is the stored bcrypted hash
        const isValidPW = bcrypt.compareSync(password, user.password);
        if (user && isValidPW) {   // ADDED   && isValidPW
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

// Return list of all Users 
// This route MUST BE PROTECTED !!!
// user MUST be logged in(pass valid credentials)
//  
// we pass in middleware   V
// server.get('/api/users', (req, res) => {

// just made middleware in seperate file
//   ORIG >>     server.get('/api/users', authorize, (req, res) => {

server.get('/api/users', authorizeMW, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

/*
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// create Custom Middleware for AuthZ-> R U allowed to get what do you want?
function authorize(req, res, next) {
  // define custom headers by prefixing with x-
const username = req.headers['x-username'];
const password = req.headers['x-password'];


  console.log('username header ===> ', username);
  console.log('password header ===> ', password);

    // check for header missing entirely
    // CANNOT put this inside findBy or else {} is returned
    if(username === undefined || password === undefined) {
        return res.status(451).json({
            message: ` Totally missing header info`
        })
    }    



  // we copied from above
  Users.findBy({ username })
  .first()
  .then(user => {
    // check for header missing entirely
    if(username === undefined || password === undefined) {
        return res.status(451).json({
            message: ` Totally missing header info`
        })
    }

    // we check for blank inputs
    if(!username || !password) {
      // must return to break out of middleware function
      return res.status(401).json({
        message: `Invalid Credentials: Enter a username and password`
      })
    }

    // Add BELOW    // user.password  is the stored bcrypted hash
    //       const isValidPW = bcrypt.compareSync(password, user.password);
    // We put bcrypt.compareSync into if statement BECAUSE
    // if user not defined, the first part will bail out of if statement
    // BEFORE going to bcrytpt comparSync part using user.password
  
  if (user && bcrypt.compareSync(password, user.password) ) {   // ADDED   && isValidPW
      next();   // need next here to let endpoint proceed
      // line below will cause error as we are adding multiple things to be returned
          //  AFTER providing Welcome message
      // res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: 'Invalid Credentials says the  middleware' });
    }
  })
  .catch(error => {
    res.status(500).json(error);
  });
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/

//  STAYS
const port = process.env.PORT || 5001;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));