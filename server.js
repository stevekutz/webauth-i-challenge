// SETUP and verify project in index.js, THEN seperate components, router, etc.


// server.js
// Use require in NOde to import modules
// The keyword require returns an object, which 
// references the value of module.exports for a given file.
const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); /// !!!!! ???? !!!!!
// const bcrypt = require('bcryptjs');   // ADD THIS 

// to create a server session for currently logged on user
// we need to add this
const session = require('express-session');   // ADDED here

// const db = require('./database/dbConfig.js'); // WMB specific model 
// const Users = require('./users/users-model.js');  // WBM users-router


// Define routers
const authRouter = require('./auth/auth-router.js'); 
// const restrictRouter = require('./restricted/restricted-router');
const usersRouter = require('./users/users-router');

const server = express(); // defines express app as server obj 

// THIS is needed to define session in our db instead of server memory
// this returns a class, so we use Uppercase (I think it is like a HOC)
      const SessionStore = require('connect-session-knex')(session); // might need an npm install here

const sessionConfig = {
    name: 'monkeyChallenge', // session name,
    secret: 'super secret string' , // used to sign/encrypt the session ID cookie
    resave: false,  // it avoids re-creating an unchanged session
    saveUninitialized: false,   // prevents setting cookies automatically
    cookie: {
      maxAge: 60*60*1000   , // when cookie expires(in ms), 1 hour = 60*60*1000
      secure: false,   // true for HTTPS, false for HTTP, need SSL cert for HTTPS
      httpOnly: true, // Set-Cookie attribute, we DO NOT want session coookie avail to JavaScript
    },    // WE add below AFTER installing connect-session-knex to create db Storage
    store: new SessionStore({
    knex: require('./data/dbConfig'),  // provides knex instance
      tablename: 'sessions',   // table name in db
     sidfieldname: 'sid',    // column name in sessions table
     createtable: true,    // create this table if it exists
     clearInterval:  60*60*1000 // time in ms the session will expire 60sec * 60min * 1000ms
    })     
  }


  // mount the middleware !!!
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig)); // NOTICE sessionConfig here !


// define actual endpoints for router objects
server.use('/auth', authRouter);
// server.use('/users', usersRouter);
server.use('/api/users', usersRouter);  // changed route to include /api/


// SANITY CHECK - this time we get JSON response
server.get('/', (req, res) => {
    res.cookie('testCookie', 'blahblahblah'); // ADDED
    res.json({ api: 'JSONstyleResponseWorkinGood' });
  });
  
  module.exports = server;