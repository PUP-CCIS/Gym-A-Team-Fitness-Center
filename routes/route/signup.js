var router = require('express').Router()
var mid = require('../../middleware')

router.get('/', (req, res) => {
	res.render('Asignup', req.query)
})

//F U N C T I O N S   H E R E ~
function expDate(par, id){
	console.log(par)
	var ret
	
}

router.post('/', (req, res) => {
	var db = require('../../lib/db')()

	const strQuery1 = `INSERT INTO tbluser (userEmailAdd, userPassword, userType) \
					VALUES ("${req.body.emailAdd}", "${req.body.password}", 2)`

	db.query(strQuery1, (err, results) => {
		
		const strQuery2 = `SELECT userID FROM tbluser WHERE userEmailAdd="${req.body.emailAdd}"`

		db.query(strQuery2, (err, results) => {
			
			userID = results[0].userID
			par = req.body.memtype
			var strQuery3 = ``

			if(par===0){
				console.log("zero")
				strQuery3 = `INSERT INTO tblmember (membID, membFName, membMName, membLName,membBday, membContact, membValID, membDateExp)
									VALUES ("${userID}","${req.body.fname}","${req.body.mname}","${req.body.lname}",CONCAT("${req.body.year}","-","${req.body.month}","-","${req.body.day}"),"${req.body.contact}","${req.body.memtype}",DATE_ADD(CURDATE(), INTERVAL 1 MONTH))`
			}

			else if(par===1){
				console.log("one")
				strQuery3 = `INSERT INTO tblmember (membID, membFName, membMName, membLName,membBday, membContact, membValID, membDateExp)
									VALUES ("${userID}","${req.body.fname}","${req.body.mname}","${req.body.lname}",CONCAT("${req.body.year}","-","${req.body.month}","-","${req.body.day}"),"${req.body.contact}","${req.body.memtype}",DATE_ADD(CURDATE(), INTERVAL 6 MONTH))`
			}

			else{
				console.log("two")
				strQuery3 = `INSERT INTO tblmember (membID, membFName, membMName, membLName,membBday, membContact, membValID, membDateExp)
									VALUES ("${userID}","${req.body.fname}","${req.body.mname}","${req.body.lname}",CONCAT("${req.body.year}","-","${req.body.month}","-","${req.body.day}"),"${req.body.contact}","${req.body.memtype}",DATE_ADD(CURDATE(), INTERVAL 1 YEAR))`
			}

			console.log(strQuery3)
			db.query(strQuery3, (err, results) => {
				if(err) throw err
				
				console.log("Succesfully registered")
				res.redirect('/login')
			})
		})
		})
})

exports.signup = router
