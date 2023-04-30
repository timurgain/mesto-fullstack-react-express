const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');
const { AuthenticationRequiredError } = require('../errors/castomErrors');

function readCookieCredentials(req, res, next) {
  const { jwt } = req.cookies;
  if (!jwt) return next();
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, config.jwt.secretKey);
  } catch {
    return next();
  }
  req.user = payload;
  return next();
}

function isAuthorized(req, res, next) {
  // it checks if there is user id which is taken from jwt provided with httpOnly cookie
  if (!req.user || !req.user._id) next(new AuthenticationRequiredError());
  next();
}

module.exports = { readCookieCredentials, isAuthorized };
