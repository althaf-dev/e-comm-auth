require('dotenv').config();

module.exports = Object.freeze({
  BASE_URL: process.env.BASE_URL_DEV,
  ACCEES_TOKEN_KEY:process.env.ACCESSTOKEN,
  REFRESH_TOKEN_KEY:process.env.REFRESHTOKEN
});
