var router = require('express').Router()
var db = require('../../lib/db')()
var trainerid

router.get('/:id', (req, res) => {
    console.log(req.params)
    res.render('Amem', {memb: req.params.id})
})

router.get('/train/sched', (req, res) => {
    res.render('Amemsched', req.query)
})

router.post('/train/sched', (req, res) => {
    
})


//          P   R   O   G   R   A   M
router.get('/prog/:mid', (req, res) => {
    strQuery = `SELECT * FROM tblprogram`
    console.log(req.params)
    db.query(strQuery, (err, results) => {
        if(err) throw err
        res.render('Amemprog', {programs: results, membid: req.params.mid})
    })
})


router.post('/prog/:progid/:mid', (req, res) => {
    const strQuery = `INSERT INTO tblprogmember (progID, userID) VALUES("${req.params.progid}","${req.params.mid}")`

    db.query(strQuery, (err, out) => {
        if(err) throw err
        res.redirect(`/member/${req.params.mid}`)
    })
})

router.get('/train/:id',(req, res) => {
    const query="select * from tbltrainer"
    console.log(req.params)
    db.query(query, (err, out) => {
        if(err) throw err
        res.render("Amemtrain", {trainers: out, membid: req.params.id})
    })
})

// router.get('/train/:mid/:tid', (req, res) => {
//     trainerid= `${req.params.tid}`
//     const query="select * from tbltrainer"
//     console.log(req.params)
//     db.query(query, (err, out) => {
//         if(err) throw err
//         res.render("Amemtrain", {trainers: out, membid: req.params.mid})
//     })
// })

router.route('/train/:membid/:tid')
    .post((req, res) => {
        console.log(req.params.tid)
        const strQuery = `SELECT * FROM tbltrainer WHERE trainerID="${req.params.tid}"`

        db.query(strQuery, (err, results) => {
            if(err) throw err
            console.log(results[0].trainerCode)
            console.log(req.body.memtcode)
            // if(results[0].trainerCode === req.body.memtcode){
                const strQuer = `UPDATE tblmember SET membTrainerID=${req.params.tid} WHERE membID=${req.params.membid}`

                db.query(strQuer, (err, results) => {
                    if(err) throw err
                    console.log("success")
                    res.redirect("/member/train/sched")
                })
            // }

            // else{
            //     console.log('Ewow')
            // }
        })
    })

exports.member = router