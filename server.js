// SETUP and verify proejct in index.js, THEN seperate components, router, etc.


// server.js
// Use require in NOde to import modules
// The keyword require returns an object, which 
// references the value of module.exports for a given file.
const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); /// !!!!! ???? !!!!!
const bcrypt = require('bcryptjs');   // ADD THIS 

const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');


// Define router paths
const 