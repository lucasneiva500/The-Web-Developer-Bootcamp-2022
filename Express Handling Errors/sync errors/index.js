const express = require('express');
const morgan = require('morgan');
const app = express();

const AppError = require('./AppError')

app.use(morgan('tiny'))

// primeiro middleware escrito
// app.use((req, res, next) => {
//     console.log('First writed middleware!')
//     next();
// })

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method.toUpperCase(), req.path)
    console.log('Request time:', req.requestTime)
    return next();
})

// em todos os urls necessário ?password = senha
// app.use((req, res, next) => {
//     const { password } = req.query;
//     if (password === 'senha') {
//         return next();
//     }
//     res.send('Sorry, you need a password')
// })

const verifyPassword = ((req, res, next) => {
    const { password } = req.query;
    if (password === 'senha') {
        return next();
    }
    throw new AppError('Password required!', 401)
    // res.status(401)
    // throw new Error('Sorry, you need a password')
})

app.get('/', (req, res) => {
    res.send('home page!')
})

app.get('/dogs', (req, res) => {
    res.send('woof')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('carta de suicído programada para a expedição no dia 06/09/2052')
})

app.get('/admin', (req, res) => {
    throw new AppError('You are not an admin', 403)
})

app.get('/error', (req, res) => {
    chicken.fly()
})

app.use((req, res) => {
    res.status(404).res.send('Not Found!')
})

// app.use((err, req, res, next) => {
//     console.log('*******************************')
//     console.log('*************ERROR*************')
//     console.log('*******************************')
//     res.status(500).send('Oh boy, we got an error!  ')
// })

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('App is running on port 3000')
})