const router = require('express').Router();

router.get('/products', (req, res) => {
    res.send('Hello World! Product')
})

module.exports = router;