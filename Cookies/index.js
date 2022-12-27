const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('secret'));

app.get('/greet', (req, res) => {
    const { name = 'No-name' } = req.cookies;
    res.send(`Hey There ${name}!`)
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'lucas n');
    res.cookie('animal', 'harlequin shrimp');
    res.cookie('color', 'purple');
    res.send('ok sent you a cookie!')
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true });
    res.send('ok, send you signed cookie!')
})

app.get('/verifyfruit', (req, res) => {
    res.send(`Unsigned Cookies: ${req.cookies}, Signed Cookies: ${req.signedCookies}`)
})

app.listen(3000, () => {
    console.log('Listening on port 3000!')
})