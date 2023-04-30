const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');
const { AuthenticationRequiredError } = require('../errors/castomErrors');

function isAuthenticated(req, res, next) {
  const { jwt } = req.cookies;
  if (!jwt) return next(new AuthenticationRequiredError());
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, config.jwt.secretKey);
  } catch {
    return next(new AuthenticationRequiredError());
  }
  req.user = payload;
  return next();
}

module.exports = { isAuthenticated };
