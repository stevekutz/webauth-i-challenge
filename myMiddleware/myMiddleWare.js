


module.exports = (req, res, next) => {
  console.log('**** MW says req.session is \n', req.session);
  console.log('**** MW says req.session.user is \n', req.session.user);
  
  
  // we have session data stored
  if(req.session && req.session.user) {
    next();

  } else {
    res.status(401).json({
      message: ` You shall not pass, you are NOT MW authorized`
    })

  }
}



/*  DON'T NEED after we have check for session

const bcrypt = require('bcryptjs');   // WBM - server
const Users = require('../users/users-model'); // WBM to specific router
const db = require('../data/dbConfig');  // WBM - router


// create Custom Middleware for AuthZ-> R U allowed to get what do you want?
//   MUST setup as module.exports
module.exports = function authorizeMW(req, res, next) {
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
  */