const express = require('express');
const bodyParser = require('body-parser')
const datalayer = require('./datalayer')

const app = express();

app.use(bodyParser.json());

app.post('/login', function (req, res) {
  res.send('Success')
});

app.post('/signup', function (req, res) {
  const user = req.body;
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