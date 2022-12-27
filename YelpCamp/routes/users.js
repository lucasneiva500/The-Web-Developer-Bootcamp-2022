const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('passport');

const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const users = require('../controllers/users');

router.route('/login')
    .get(catchAsync(users.renderLogin))
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(users.login))

router.route('/register')
    .get(catchAsync(users.renderRegister))
    .post(catchAsync(users.register));

router.get('/logout', catchAsync(users.logout));

module.exports = router;