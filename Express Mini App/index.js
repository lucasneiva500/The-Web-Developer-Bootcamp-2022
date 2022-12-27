const express = require('express');
const app = express();
const path = require('path')
//const redditData = require('./data.json)
//console.log (redditData)

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats })
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { rand: num })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    //const data = redditData[subreddit]
    //console.log(data)
    res.render('subreddit', { subreddit });
    //if (data) {
    // res.render('subreddit', { ...data });
    // } else {
    // res.render('notfound', { subreddit })
    //}
    //a página HTML terá acesso a name,description,subscribers, etc
    //caso não ache a data, redireciona para notfound.ejs
    //notfound.ejs h1 = im'sorry, we couldn't find the <%= subreddit %> subreddit!
})

app.listen(3000, () => {
    console.log('listening on port 3000!')
})