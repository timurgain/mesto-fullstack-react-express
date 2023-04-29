const router = require('express').Router();
const jsonParser = require('express').json();
const routerUsers = require('./users');
const routerCards = require('./cards');
const { login, createUser, logout } = require('../controllers/users');
const { readCookieCredentials } = require('../middlewares/auth');
const { signupValidation, signinValidation } = require('../middlewares/validation/user');
const { UrlNotFoundError } = require('../errors/castomErrors');


// crash-test (need to pass a code review)
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// registration, login, logout
router.post('/signup', jsonParser, signupValidation, createUser);
router.post('/signin', jsonParser, signinValidation, login);
router.post('/logout', readCookieCredentials, logout);

// main app routes, required to be authenticated
router.use('/users', readCookieCredentials, routerUsers);
router.use('/cards', readCookieCredentials, routerCards);

// 404, url not found
router.use('*', (req, res, next) => next(new UrlNotFoundError()));

module.exports = router;
