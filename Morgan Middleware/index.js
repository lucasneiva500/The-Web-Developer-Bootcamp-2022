const express = require('express');
const morgan = require('morgan');
const app = express();

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
    res.send('Sorry, you need a password')
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

app.use((req, res) => {
    res.status(404).res.send('Not Found!')
})

app.listen(3000, () => {
    console.log('App is running on port 3000')
})