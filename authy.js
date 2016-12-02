var config = require('./config');
var querystring = require('querystring');
// Create authenticated Authy API client
var authy = require('authy')(config.authyApiKey);

function registerUser(user) {
  email = user.email;
  phone = user.phone;
  countryCode = user.countryCode;

  return new Promise(function (fulfill, reject) {
    authy.register_user(email, phone, countryCode, function(err, response) {
      if(err){
        reject(err);
        return;
      }
      fulfill(response.user.id);
    });
  });
}

function sendToken(user) {
  return new Promise(function (fulfill, reject) {
    authy.request_sms(user.authyId, function(err, response) {
      if(err){
        reject(err);
        return;
      }
      fulfill();
    });
  });
}

function verifyToken(user, otp) {
  return new Promise(function (fulfill, reject) {
    authy.verify(user.authyId, otp, function(err, response) {
      if(err){
        reject(err);
        return;
      }
      fulfill();
    });
  });
}

module.exports = { registerUser, sendToken }