const express = require('express')
const { v4: uuidv4 } = require('uuid')
const methodOverride = require('method-override')
const app = express();
const path = require('path')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuidv4(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuidv4(),
        username: 'Todd',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuidv4(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuidv4(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    },

]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new', { comments })
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')

})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuidv4() })
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params
    comments = comments.filter( c => c.id !== id)
    res.redirect('/comments')
})

app.listen(3000, () => {
    console.log('listening on port 3000!')
})