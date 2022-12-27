const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All Shelters')
})

router.get('/:id', (req, res) => {
    res.send('Viewing One Shelter')
})

router.get('/:id/edit', (req, res) => {
    res.send('Editing One Shelter')
})

router.post('/', (req, res) => {
    res.send('Creating a Shelter')
})

////////// rotas escritas por inteiro //////////
// router.get('/shelters', (req, res) => {
//     res.send('All Shelters')
// })

// router.get('/shelters/:id', (req, res) => {
//     res.send('Viewing One Shelter')
// })

// router.get('/shelters/:id/edit', (req, res) => {
//     res.send('Editing One Shelter')
// })

// router.post('/shelters', (req, res) => {
//     res.send('Creating a Shelter')
// })

module.exports = router;