const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoDBRelationships', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("OH NO, MONGO CONNECTION ERROR!!!")
        console.log(err)
    })

//////////////////// ONE TO FEW  ////////////////////

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            // cada address terá um id único
            // o mongo trata cada address como um Schema embutido
            // é possível não criar esse id para cada endereço utilizando:
            // _id: {id: false},
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter',

    })
    u.addresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push(
        {
            street: '99 3rd St.',
            city: 'New York',
            state: 'NY',
            country: 'USA'
        }
    )
    const res = await user.save()
    console.log(res)
}

// makeUser();
// addAddress('61fd5de6a189e7d3d90bc30b');