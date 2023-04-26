const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');
const { AuthenticationRequiredError } = require('../errors/castomErrors');

function readCookieCredentials(req, res, next) {
  const { jwt } = req.cookies;
  if (!jwt) next(new AuthenticationRequiredError());
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, config.jwt.secretKey);
  } catch {
    next(new AuthenticationRequiredError());
  }
  req.user = payload;
  next();
}

module.exports = { readCookieCredentials };
