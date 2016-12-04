module.exports = {
  port: process.env.PORT || 3000,
  authyApiKey: "",
  mongoUrl: process.env.MONGOLAB_URI || process.env.MONGO_URL,
};
