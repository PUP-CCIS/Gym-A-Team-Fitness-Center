var router=require("express").Router()
var db=require("../../lib/db")()



router.get("/", (req, res) => {
    const query="select * from tbltrainer"

    db.query(query, (err, out) => {
        res.render("Aadmintrainer", {trainers: out})
    })
})

router.route('/add')
    .get((req, res) => {
        console.log(stringGen(10));

        var out = stringGen(10)

        res.render('AadmintrainerA', {codes: out})
    })

    .post((req, res) => {

        console.log("Hello")

        const strQuery = `INSERT INTO tbltrainer (trainerFName, trainerMName, trainerLName, trainerDesc, trainerContact, trainerEmailAdd, trainerCode) 
                        VALUES ("${req.body.tfname}","${req.body.tmname}","${req.body.tlname}","${req.body.tdesc}","${req.body.tcontact}","${req.body.temailadd}","${req.body.tcode}")`

        db.query(strQuery, (err, results) => {
            if(err)
                console.log(err)
            console.log("Sucess")
            res.redirect('/trainer')
        })
        console.log("error")
    })

router.route('/edit/:id')
    .get((req, res) => {
        const strQuery = `SELECT * FROM tbltrainer WHERE trainerID="${req.params.id}"`

        db.query(strQuery, (err, out) => {
            if(err) 
                console.log(err)
            console.log(out)
            res.render('AadmintrainerE', {trainers: out})
        })
        
    })

    .post((req, res) => {
        const strQuery = `UPDATE tbltrainer SET
                    trainerFName="${req.body.tfname}",
                    trainerMName="${req.body.tmname}",
                    trainerLName="${req.body.tlname}",
                    trainerDesc="${req.body.tdesc}",
                    trainerContact="${req.body.tcontact}",
                    trainerEmailAdd="${req.body.temailadd}",
                    trainerCode="${req.body.tcode}"
                    WHERE trainerID="${req.params.id}"`

        db.query(strQuery, (err, out) => {
            if(err)
                console.log(err)
            console.log('updated succesfully')
            res.redirect('/trainer')
        })
    })

router.get('/delete/:id', (req, res) => {
    const strQuery = `DELETE FROM tbltrainer WHERE trainerID=${req.params.id}`

    db.query(strQuery, (err, results) => {
        if(err)
            console.log(err)
        console.log('succesfully deleted ehehehe')
        res.redirect('/trainer')
    })
})

function stringGen(len)
{
    var text = " ";
    
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    
    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    
    return text;
}


exports.trainer = router