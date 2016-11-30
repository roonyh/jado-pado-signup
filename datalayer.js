var MongoClient = require('mongodb').MongoClient

function init(url='mongodb://localhost:27017/jadopadosignup') {
  return MongoClient.connect(url).then(db => {
    console.log(db);
    this.db = db;
  });
}

function addUser(user) {
  const { db } = this;
  const users = db.collection('users');

  user._id = user.username;
  delete(user.username)
  return users.insert(user);
}

const datalayerSingleton = {
  init, addUser
}

module.exports = datalayerSingleton