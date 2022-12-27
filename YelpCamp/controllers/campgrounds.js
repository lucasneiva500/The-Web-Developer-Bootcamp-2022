const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken});

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
};

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({ path: 'reviews', populate: { path: 'author' } }).populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        res.redirect('/campgrounds');
    };
    res.render('campgrounds/show', { campground });
};

module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground to edit!');
        res.redirect('/campgrounds');
    };
    res.render('campgrounds/edit', { campground });
};

module.exports.createCampground = async (req, res, next) => {
    // if (!req.body.campground) throw new ExpressError('Invalid Campground', 400);
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send();
    // console.log(geoData.body.features[0].geometry.coordinates);
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.author = req.user._id;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.images.push(...imgs);
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        };
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    };  
    await campground.save();
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    for (let _id of campground.images) {
        await cloudinary.uploader.destroy(_id.filename);
    };
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
};