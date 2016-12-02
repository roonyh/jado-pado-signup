const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passwordHash = require('password-hash');
const datalayer = require('./datalayer');
const authy = require('./authy');
const app = express();

app.use(bodyParser.json());

app.post('/login', function (req, res) {
  const user = req.body;

  datalayer.getUser(user.email)
    .then(savedUser => {
      if(!user){
        return null;
      }
      const match = passwordHash.verify(user.email + user.password, savedUser.hashedPassword);

      if(match) {
        return savedUser;
      } else {
        return null;
      }
    })
    .then(user => {
      if(!user){
        throw 'NO_USER';
      }
      return authy.sendToken(user)
    })
    .catch(e => { console.log(e);
      res.status(400); res.send('Error');
    })
    .then(() => { res.send(); })
});

app.post('/signup', function (req, res) {
  const user = req.body;

  user.hashedPassword = passwordHash.generate(user.email + user.password);
  delete(user.password)

  authy.registerUser(user)
    .then(id => {
      return id;
    })
    .catch(e => {
      res.status(400);
      res.json({error: 'AUTHY_ERROR'});
    })
    .then(id => {
      user.authyId = id;
      return datalayer.addUser(user);
    })
    .then(() => {
      res.send();
    })
    .catch(e => {
      res.status(400);
      res.json({error: 'EMAIL_EXISTS', existingEmail: user._id});
    })
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