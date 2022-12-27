const express = require('express');
const router = express.Router();

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image', 10), validateCampground, catchAsync(campgrounds.createCampground));

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;