const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true, // não suportada
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 250; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // image: 'https://source.unsplash.com/collection/483251/',
            // author = pessoal user id
            author: '63aa44ccb9b86edad6e19061',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                url: 'https://res.cloudinary.com/lucasneiva500/image/upload/v1647884951/YelpCamp/g8zipxms5yq91vp4gv5g.jpg',
                filename: 'YelpCamp/g8zipxms5yq91vp4gv5g'
            }],
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, deserunt aut! Harum nesciunt vero perferendis cumque commodi, iure, dignissimos quam voluptatum similique distinctio quaerat unde ipsum corrupti id voluptatem explicabo.',
            price
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});