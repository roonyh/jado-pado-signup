const express = require('express');
const bodyParser = require('body-parser');
const passwordHash = require('password-hash');
const datalayer = require('./datalayer');
const app = express();

app.use(bodyParser.json());

app.post('/login', function (req, res) {
  const user = req.body;

  datalayer.getUser(user.email)
    .then(savedUser => {
      const match = passwordHash.verify(user.email + user.password, savedUser.hashedPassword);

      if(match) {
        res.send('Success');
      } else {
        res.send('No match')
      }
    })
    .catch(e => { res.send('Error') })
});

app.post('/signup', function (req, res) {
  const user = req.body;

  user.hashedPassword = passwordHash.generate(user.email + user.password);
  delete(user.password)

  datalayer.addUser(user)
    .then(() => {
      res.send('Success')
    })
    .catch(e => {
      res.send('Error')
    });
});

datalayer.init()
  .then(() => {
    app.listen(3001, function () {
      console.log('Example app listening on port 3001!')
    });
  })
  .catch(e => {
    console.log(e);
    console.log('Fail to init datalayer');
  });