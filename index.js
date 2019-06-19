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








//  STAYS
const port = process.env.PORT || 5001;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));