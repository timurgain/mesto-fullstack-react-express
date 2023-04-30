const router = require('express').Router();
const jsonParser = require('express').json();
const routerUsers = require('./users');
const routerCards = require('./cards');
const { login, createUser, logout } = require('../controllers/users');
const { isAuthenticated } = require('../middlewares/auth');
const { signupValidation, signinValidation } = require('../middlewares/validation/user');
const { UrlNotFoundError } = require('../errors/castomErrors');

// registration, login, logout
router.post('/signup', jsonParser, signupValidation, createUser);
router.post('/signin', jsonParser, signinValidation, login);
router.post('/logout', isAuthenticated, logout);

// main app routes, required to be authenticated
router.use('/users', isAuthenticated, routerUsers);
router.use('/cards', isAuthenticated, routerCards);

// 404, url not found
router.use('*', (req, res, next) => next(new UrlNotFoundError()));

module.exports = router;
