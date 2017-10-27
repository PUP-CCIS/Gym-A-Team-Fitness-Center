var router = require('express').Router()
var db = require('../../lib/db')()

// F U N C T I O N S    H E R E
function con(par){
    return (par < 9? "0" : "") + par
}

function conTime(par){
    var time = par
    var hours = Number(time.match(/^(\d+)/)[1])
    var minutes = Number(time.match(/:(\d+)/)[1])
    var AMPM = time.match(/\s(.*)$/)[1].toLowerCase()

    if (AMPM == "pm" && hours < 12) hours = hours + 12
    if (AMPM == "am" && hours == 12) hours = hours - 12
    var sHours = hours.toString()
    var sMinutes = minutes.toString()
    if (hours < 10) 
        sHours = "0" + sHours
    if (minutes < 10) 
        sMinutes = "0" + sMinutes

    var timeS = sHours+':'+sMinutes+':00'
    return timeS
}

function conDate(par){
    var date = par
    var today = new Date(date);
    today.toISOString().substring(0, 10);
    var dayS = today.getFullYear()+"-"+con(today.getMonth()+1)+"-"+today.getDate()

    return dayS
}

//r o u t e s
router.get('/', (req, res) => {
    strQuery = `SELECT * FROM tblprogram`

    db.query(strQuery, (err, results) => {
        if(err) throw err
        res.render('Aadminprogram', {programs: results})
    })
})

router.get('/add', (req, res) => {
    console.log('GET')
    res.render('AadminprogramA', req.query)
})

router.post('/add', (req, res) => {
    var day = conDate(req.body.pdate)
    var timeNow = conTime(req.body.ptime)
    console.log(day)

    const strQuery1 = `INSERT INTO tblprogram (progName, progPrice, progDate)
         VALUES ("${req.body.pname}",${req.body.pprice},CONCAT("${day}"," ","${timeNow}"))`
       
    db.query(strQuery1, (err, results) => {
        if(err)
            console.log(err)
        console.log(req.params)
        res.redirect('/program')
    })
})

router.route('/edit/:id')
    .get((req, res) => {
        const strQuery = `SELECT * FROM tblprogram WHERE progID="${req.params.id}"`

        db.query(strQuery, (err, results) => {
            if(err) throw err
            console.log(results)
            res.render('AadminprogramE', {programs: results})
        })
    })

    .post((req, res) => {
        console.log(req.body)

        var day = conDate(req.body.pdate)
        var timeNow = conTime(req.body.ptime)

        const strQuery = `UPDATE tblprogram SET
                    progName="${req.body.pname}",
                    progDate=CONCAT("${day}"," ","${timeNow}"),
                    progPrice=${req.body.pprice}
                    WHERE progID=${req.params.id}`

        db.query(strQuery, (err, results) => {
            if(err) throw err

            res.redirect('/program')
        })
    })

router.get('/delete/:id', (req, res) => {
    const strQuery = `DELETE FROM tblprogram WHERE progID=${req.params.id}`

    db.query(strQuery, (err, results) => {
        if(err)
            console.log(err)
        console.log('succesfully deleted ehehehe')
        res.redirect('/program')
    })
})

exports.program = router