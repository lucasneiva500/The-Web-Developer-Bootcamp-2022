const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');

const User = require('./models/user');
const user = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'notagoodsecret' }))

mongoose.connect('mongodb://localhost:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("OH NO, MONGO CONNECTION ERROR!!!")
        console.log(err)
    })

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
}

// ------------------------- Routes -------------------------

app.get('/', (req, res) => {
    res.send('This is the home page!')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})

// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hash = await bcrypt.hash(password, 12)
//     const user = new User({
//         username,
//         password: hash
//     })
//     await user.save();
//     req.session.user_id = user._id;
//     res.redirect('/')
// })

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/')
})

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (validPassword) {
//         req.session.user_id = user._id;
//         res.redirect('/secret')
//     } else {
//         res.redirect('/login')
//     }
// })

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password)
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/secret')
    } else {
        res.redirect('/login')
    }
})

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret')
})

app.get('/topsecret', requireLogin, (req, res) => {
    res.send('TOP SECRET !!!')
})

app.post('/logout', (req, res) => {
    // req.session.user_id = null;
    // não muito útil pois não tira todos os dados da sessão, somente o id do usuário
    req.session.destroy();
    res.redirect('/login')
})

// --------------------------------------------------

app.listen(3000, () => {
    console.log('Listening on port 3000')
})