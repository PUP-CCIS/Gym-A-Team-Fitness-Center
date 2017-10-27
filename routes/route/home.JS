var router = require('express').Router();

router.get('/', (req, res) => {
    res.render('Ahome', req.query)
})

exports.home = router