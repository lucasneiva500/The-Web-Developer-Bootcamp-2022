const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }
    res.send('Sorry, not an admin.')
})

router.get('/topsecret', (req, res) => {
    res.send('THIS IS TOP SECRET!')
})

router.get('/deleteEverything', (req, res) => {
    res.send('OK, ALL DATA IS BEING DELETED!')
})



module.exports = router;