var router = require('express').Router()
var mid = require('../../middleware')

router.get('/', (req, res) => {
	res.render('Alogin', req.query)
})

router.post('/', (req, res) => {
	var db = require('../../lib/db')()

	const strQuery = `SELECT * FROM tbluser WHERE userEmailAdd = "${req.body.username}"`

	db.query(strQuery, (err, user) => {
		if(err) throw err
		
		if(!user){
			console.log("none existance")
			res.redirect('/login')
		}

		else{
			if(user[0].userPassword === req.body.password){
				console.log("Correct Password")
				
				if(user[0].userType === 2)
					res.redirect(`/member/${user[0].userID}`)
				else
					res.redirect('/admin')
			}

			else{
				console.log("Wrong pass", user[0].userPassword)
				res.redirect('/login')
			}
		}
	})
})

exports.login = router