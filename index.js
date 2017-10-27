require('dotenv').config()

var express = require('express')
var app = express()

require('./sys/core/boot')(app)
require('./sys/routes')(app)

var update_col, update_id = 0;


app.get('/login', (req, res) => {
	res.render('Alogin')
})

app.listen(app.get('port'), () => {
	console.log(`Listening to port ${app.get('port')}`)
})