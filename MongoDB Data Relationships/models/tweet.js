const path = require('path');
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/mongoDBRelationships', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("OH NO, MONGO CONNECTION ERROR!!!")
        console.log(err)
    })

//////////////////// ONE TO BAJILLIONS ////////////////////

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async () => {
    // const user = new User({ username: 'chickenfan99', age: 61 });
    const user = await User.findOne({ username: 'chickenfan99' })
    //const tweet1 = new Tweet({ text: 'omg i love my chicken family!', likes: 0 })
    const tweet2 = new Tweet({ text: 'bock bock bock my chickens make noises', likes: 1239 })
    //tweet1.user = user;
    tweet2.user = user;
    // user.save();
    tweet2.save();
    //tweet1.save();
}

// makeTweets();

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user', 'username');
    console.log(t);
}

findTweet();