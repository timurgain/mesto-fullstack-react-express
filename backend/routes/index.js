const router = require('express').Router();
const jsonParser = require('express').json();
const routerUsers = require('./users');
const routerCards = require('./cards');
const { login, createUser } = require('../controllers/users');
const { readCookieCredentials } = require('../middlewares/auth');
const { signupValidation, signinValidation } = require('../middlewares/validation/user');
const { UrlNotFoundError } = require('../errors/castomErrors');

// registration and login
router.post('/signup', jsonParser, signupValidation, createUser);
router.post('/signin', jsonParser, signinValidation, login);

// main app routes, required to be authenticated
router.use('/users', readCookieCredentials, routerUsers);
router.use('/cards', readCookieCredentials, routerCards);

// 404, url not found
router.use('*', (req, res, next) => next(new UrlNotFoundError()));

module.exports = router;
