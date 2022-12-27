const express = require('express');
const app = express();

// app.use((req, res) => {
//     console.log('We got a new request!')
//     res.send('Hello, we got your request! This is a response!')
// })

app.get('/search', (req, res) => {
    console.log('Searching for:', req.query);
    const { q } = req.query;
    if (!q) {
        res.send('<h1>Nothing found if nothing searched!</h1>')
    } else {
        console.log(`Search request for ${q} (GET)`)
        res.send(`<h1>Search results for ${q}!</h1>`)
    }
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    console.log(`Subreddit request for ${subreddit}! (GET)`)
    res.send(`<h1>This is a subreddit search for ${subreddit}!</h1>`)
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    console.log(`Subreddit request for ${subreddit} with ID of ${postId}! (GET)`)
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit!</h1>`)
})

app.get('/', (req, res) => {
    console.log('Home page request! (GET)')
    res.send('This is the home page! (GET)')
})

app.get('/cats', (req, res) => {
    console.log('Cat request! (GET)')
    res.send('Meow! (GET)')
})

app.get('/dogs', (req, res) => {
    console.log('Dog request! (GET)')
    res.send('Woof! (GET)')
})

app.post('/', (req, res) => {
    console.log('Post request to /')
    res.send('This is the home page! (Post resquest!)')
})

app.post('/cats', (req, res) => {
    console.log('Post request to /cats')
    res.send('Meow! (Post resquest!)')
})

app.post('/dogs', (req, res) => {
    console.log('Post request to /dogs')
    res.send('Woof! (Post resquest!)')
})

app.get('*', (req, res) => {
    // console.log('Get request to a unspecified path!') --- o console.log sempre funcionará nesse caso!
    res.send(`Someting wen't wrong with the GET request`)
})

app.get('*', (req, res) => {
    // console.log('Post request to a unspecified path!') --- o console.log sempre funcionará nesse caso!
    res.send(`Someting wen't wrong with the POST request`)
})



app.listen(3000, () => {
    console.log('Listening on port 3000')
})

// http://localhost:3000/r/subreddit/postId
// http://localhost:3000/search/?q=