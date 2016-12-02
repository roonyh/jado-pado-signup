const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passwordHash = require('password-hash');
const datalayer = require('./datalayer');
const authy = require('./authy');
const app = express();

app.use(bodyParser.json());

function setupRoutes() {
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
        req.session.authyId = user.authyId;
        return authy.sendToken(user)
      })
      .catch(e => {
        console.log(e);
        res.status(400);
        res.send('Error');
      })
      .then(() => { req.session.save(() => res.send()); })
  });

  app.post('/verify', function (req, res) {
    const authyId = req.session.authyId;
    const otp = req.body.code;
    console.log(authyId);

    authy.verifyToken(authyId, otp)
      .then(v => {
        res.send();
      })
      .catch(e => {
        res.status(400);
        console.log(e);
        res.send('Error');
      })
  });

  app.post('/signup', function (req, res) {
    const user = req.body;
    user.sessionId = req.session.id;

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
        res.session.authyId = user.authyId;
        res.send();
      })
      .catch(e => {
        res.status(400);
        res.json({error: 'EMAIL_EXISTS', existingEmail: user._id});
      })
  });
};

datalayer.init()
  .then(db => {
    // We are not using secure cookies because we dont have https. So just setting secret because
    // its required.
    app.use(session({secret: 'foo', cookie: { httpOnly: false, secure: false, maxAge: 2000000000 }}));
    setupRoutes();
    app.listen(3001, function () {
      console.log('Example app listening on port 3001!')
    });
  })
  .catch(e => {
    console.log(e);
    console.log('Fail to init datalayer');
  });