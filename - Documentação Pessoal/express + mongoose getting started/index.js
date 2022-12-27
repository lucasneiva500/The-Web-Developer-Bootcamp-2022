const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/applicationName', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("OH NO, MONGO CONNECTION ERROR!!!")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.listen(3000, () => {
    console.log('APP LISTENING ON PORT 3000')
})