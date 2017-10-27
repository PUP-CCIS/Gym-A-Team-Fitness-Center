var router = require('express').Router()

router.get('/', (req, res) => {
    res.render('Aadmin')
})

exports.admin = router