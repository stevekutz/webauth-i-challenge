const router = require('express').Router();

const Users = require('./users-model.js');
// all code in restricted-middleware is called in here, there is no named function
const restrictedMW = require('../myMiddleware/myMiddleWare');

router.get('/', restrictedMW, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;