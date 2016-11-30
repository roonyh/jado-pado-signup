var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json());

app.post('/login', function (req, res) {
  res.send('Success')
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
});