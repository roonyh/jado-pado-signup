var MongoClient = require('mongodb').MongoClient

function init(url='mongodb://localhost:27017/jadopadosignup') {
  return MongoClient.connect(url).then(db => {
    this.db = db;
    return db;
  });
}

function addUser(user) {
  const { db } = this;
  const users = db.collection('users');

  user._id = user.email;
  delete(user.username)
  return users.insert(user);
}

function getUser(email) {
  const { db } = this;
  const users = db.collection('users');

  return users.findOne({_id: email});
}

const datalayerSingleton = {
  init, addUser, getUser
}

module.exports = datalayerSingleton